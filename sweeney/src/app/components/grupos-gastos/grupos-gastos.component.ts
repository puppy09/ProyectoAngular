import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { Router } from '@angular/router';
import { GruposCreadosService } from '../../services/grupos/grupos-creados.service';
import { GruposCategoriasService } from '../../services/gruposCategorias/grupos-categorias.service';
import { CurrencyPipe } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-grupos-gastos',
  standalone: true,
  imports: [SidebarComponent, CarouselModule, MatMenuModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './grupos-gastos.component.html',
  styleUrl: './grupos-gastos.component.css'
})
export class GruposGastosComponent {

  grupo:any;
  categoriasActivas:any;
  categoriasInactivas:any;
  gastosForm: FormGroup = new FormGroup({});
  editarCategoria:boolean = false;
  selectedCategoria:any;
  user:any;
  constructor(private authSvc:AuthService, private router:Router, private dataSvc:DataServiceService, private gpoSvc:GruposCreadosService, private catGpoSvc:GruposCategoriasService){
    this.grupo = this.dataSvc.getGrupoData();
    console.log(this.grupo);
  }

  ngOnInit():void{
    this.gastosForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      presupuesto: new FormControl('', [Validators.required, Validators.min(0)]),
    });
    this.loadCategoriasActivas();
    this.loadCategoriasInactivas();
    this.loadSelfData();

   
    console.log(this.categoriasActivas);
  }

  loadCategoriasActivas():void{
    this.catGpoSvc.getCategoriaGrupalActiva(this.grupo.id_grupo).subscribe((data:any)=>{
      this.categoriasActivas=data;
      console.log(this.categoriasActivas);
    });
  }

  loadCategoriasInactivas():void{
    this.catGpoSvc.getCategoriaGrupalInactiva(this.grupo.id_grupo).subscribe((data:any)=>{
      this.categoriasInactivas=data;
      console.log(this.categoriasInactivas);
    });
  }

  loadSelfData():void{
    this.authSvc.userInfo().subscribe((data:any)=>{
      this.user=data;
      console.log(this.user);
    });
  }
  editCategoria(categoria:any){
    this.selectedCategoria = null;
    this.selectedCategoria = categoria;
    console.log(this.selectedCategoria);
    this.gastosForm.patchValue({
      nombre: this.selectedCategoria.categoria,
      presupuesto: this.selectedCategoria.presupuesto
    });
    this.editarCategoria = true;
  }

  setCategoriaData(categoria:any){
    //this.dataSvc.setCategoriaData(categoria);
    //this.router.navigate(['gastos/agregar']);
  }

  desactivarCategoria(categoria:any){
    this.catGpoSvc.desactivarCategoriaGrupal(categoria.id_categoria, this.grupo.id_grupo).subscribe((data:any)=>{
      console.log(data);
      this.loadCategoriasActivas();
      this.loadCategoriasInactivas();
    });
  }
  activarCategoria(categoria:any){
    this.catGpoSvc.activarCategoriaGrupal(categoria.id_categoria, this.grupo.id_grupo).subscribe((data:any)=>{
      console.log(data);
      this.loadCategoriasActivas();
      this.loadCategoriasInactivas();
    });
  }

  submit(){
   // if(this.gastosForm.valid){
    if(this.editarCategoria==false){
      console.log("Categoria Grupal");
        console.log(this.grupo.id_grupo);
        console.log(this.gastosForm.get('nombre')?.value);
        console.log(this.gastosForm.get('presupuesto')?.value);
      this.catGpoSvc.postCategoriaGrupal(
        this.grupo.id_grupo,
        this.gastosForm.get('nombre')?.value,
        this.gastosForm.get('presupuesto')?.value
        
      ).subscribe(
        (data)=>{
          console.log(data);
          Swal.fire({
            title: 'Categoria agregada',
            text: 'La categoria se ha agregado correctamente',
            icon: 'success'
          });
          this.loadCategoriasActivas();
        },
        (error)=>{
          const errorMessage = error.error?.message;
          Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error'
          });
        }
      );
    //}else{
      //Swal.fire({
        //title: 'Error',
        //text: 'Por favor, complete todos los campos',
        //icon: 'error'
      //});
    //}
    }else if(this.editarCategoria==true){
      this.catGpoSvc.editCategoriaGrupal(
        this.selectedCategoria.id_categoria,
        this.grupo.id_grupo,
        this.gastosForm.get('nombre')?.value,
        this.gastosForm.get('presupuesto')?.value
      ).subscribe(
        (data)=>{
          console.log(data);
          this.loadCategoriasActivas();
          this.loadCategoriasInactivas();
          this.editarCategoria = false;
          Swal.fire({
            title: 'Categoria actualizada',
            text: 'La categoria se ha actualizado correctamente',
            icon: 'success'
          });
        },
        (error)=>{
          const errorMessage = error.error?.message;
          Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error'
          });
        }
      )
    }
  }
}
