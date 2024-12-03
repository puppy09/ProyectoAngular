import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DataServiceService } from '../../services/dataService/data-service.service';
import Swal from 'sweetalert2';
import { NegociosService } from '../../services/negocios/negocios.service';
import { GruposSubcategoriasService } from '../../services/gruposSubcategorias/grupos-subcategorias.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-grupos-gastos-form',
  standalone: true,
  imports: [SidebarComponent, MatRadioModule, ReactiveFormsModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './grupos-gastos-form.component.html',
  styleUrl: './grupos-gastos-form.component.css'
})
export class GruposGastosFormComponent {

  selectedCategoria:any;
  selectedRubro:any;
  subcategorias:any;
  rubros:any;
  negocios:any;
  subcategoriaForm: FormGroup = new FormGroup({});
  constructor(private dataSvc:DataServiceService, private subSvc:GruposSubcategoriasService, private negSvc:NegociosService, private router:Router){}

  ngOnInit(): void{
    this.selectedCategoria = this.dataSvc.getCategoriaGrupalData();
    console.log(this.selectedCategoria);
    this.loadSubcategorias(this.selectedCategoria);
    this.loadRubros();
    this.subcategoriaForm = new FormGroup({
      rubros: new FormControl('', Validators.required),
      negocios: new FormControl('', Validators.required),
      addNegocio: new FormControl('no', Validators.required),
      newNewgocio: new FormControl({value: '', disabled: true}, Validators.required)
    });
    this.subcategoriaForm.get('addNegocio')?.valueChanges.subscribe(value=>{
      if(value === 'si'){
        this.subcategoriaForm.get('newNewgocio')?.enable();
      }
      else{
        this.subcategoriaForm.get('newNewgocio')?.disable();
      }
    });
  }

  loadSubcategorias(categoria:any){
    this.subSvc.getSubcategoriasByCategoria(categoria.id_grupo,categoria.id_categoria,).subscribe((data)=>{
      this.subcategorias = data;
      console.log(this.subcategorias);
    }, (error)=>{
      const errorMessage = error.error?.message;
      Swal.fire({
        icon: 'error',
        title: errorMessage,
        text: 'Error al cargar las subcategorias',
        timer: 1500
      })
    })
  }
  loadRubros(){
    this.negSvc.getRubros().subscribe((data)=>{
      this.rubros = data;
    }, (error)=>{
      const errorMessage = error.error?.message;
      Swal.fire({
        icon: 'error',
        title:'Error al cargar los rubros',
        text: errorMessage,
        timer: 1500
      })
    })
  }
  loadNegocios(event:any){
    this.selectedRubro = event.target.value;
    console.log("selectedRubro: "+this.selectedRubro);
    this.negSvc.getNegocios(this.selectedRubro).subscribe((data)=>{
      this.negocios = data;
      console.log(this.negocios);
    }, (error)=>{
      const errorMessage = error.error?.message;
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar los negocios',
        text: errorMessage,
        timer: 1500
      })
    })
  }
  cancel(){
    this.router.navigate(['/grupos/gastos']);
  }
  deleteSubcategoria(subcategoria:any){
    this.subSvc.deleteSubcategoria(this.selectedCategoria.id_grupo, this.selectedCategoria.id_categoria, subcategoria.id_negocio).subscribe((data)=>{
      this.loadSubcategorias(this.selectedCategoria);
      Swal.fire({
        icon: 'success',
        title: 'Subcategoria eliminada correctamente',
        timer: 1500
      })
    }, (error)=>{
      const errorMessage = error.error?.message;
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar la subcategoria',
        text: errorMessage,
        timer: 1500
      })
    });
  }

  submit(){
    if(this.subcategoriaForm.get('addNegocio')?.value === 'si'){
      this.subSvc.postAndAsignarNegocio(this.selectedCategoria.id_grupo, this.subcategoriaForm.get('newNewgocio')?.value, this.selectedRubro, this.selectedCategoria.id_categoria).subscribe((data)=>{
        Swal.fire({
          icon: 'success',
          title: 'Negocio registrado y asignado correctamente',
          text: 'Negocio registrado correctamente',
          timer: 1500
        })
        this.loadSubcategorias(this.selectedCategoria);
      }, (error)=>{
        const errorMessage = error.error?.message;
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar y asignar negocio',
          text: errorMessage,
          timer: 1500
        })
      });
    }
    else{
      this.subSvc.postSubcategoria(this.selectedCategoria.id_grupo, this.selectedCategoria.id_categoria, this.subcategoriaForm.get('negocios')?.value).subscribe((data)=>{
        Swal.fire({
          icon: 'success',
          title: 'Subcategoria registrada correctamente',
          timer: 1500
        })
        this.loadSubcategorias(this.selectedCategoria);
      }, (error)=>{
        const errorMessage = error.error?.message;
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar la subcategoria',
          text: errorMessage,
          timer: 1500
        })
      });
    }
  }

}
