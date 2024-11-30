import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { PercentPipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { GastosFormComponent } from '../gastos-form/gastos-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { DataServiceService } from '../../services/dataService/data-service.service';

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [CarouselModule, SidebarComponent, MatMenuModule,MatButtonModule, MatIconModule, RouterModule, ReactiveFormsModule],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css'
})
export class GastosComponent {

  categorias:any;
  categoriasInactivas:any;
  categoriasActivas:any;
  isModalOpen:boolean = false;
  selectedCategoria:any;
  editarCategoria:boolean = false;
  gastosForm: FormGroup = new FormGroup({});
  constructor(private router:Router, private gasSvc: CategoriasService, private route: ActivatedRoute, private dataSvc:DataServiceService){}


  ngOnInit(): void{
    this.gastosForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      presupuesto: new FormControl('', [Validators.required, Validators.min(0)]),
    });
    this.loadCategorias();
    this.loadCategoriasActivas();
    this.loadCategoriasInactivas();
  }

  submit(){
    //if(this.gastosForm.valid){
    if(this.editarCategoria==false){
      this.gasSvc.postCategoria(
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
    /*}else{
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos',
        icon: 'error'
      });
    }*/
    }else if(this.editarCategoria==true){
      this.gasSvc.editarCategoria(
        this.selectedCategoria.ID,
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

  loadCategorias(){
    this.gasSvc.getCategorias().subscribe(
      (data)=>{
        this.categorias = data;
      },
      (error)=>{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'Error obteniendo categorias',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }
  loadCategoriasInactivas(){
    this.gasSvc.getCategoriasInactivas().subscribe(
      (data)=>{
        this.categoriasInactivas = data;
      }
    )
  }

  loadCategoriasActivas(){
    this.gasSvc.getCategoriasActivas().subscribe(
      (data)=>{
        this.categoriasActivas = data;
      }
    )
  }
  onCategoryCreated() {
    this.loadCategorias(); // Reload categories when a new one is created
  }
  activarCategoria(categoryId: string){
    this.gasSvc.activarCategoria(categoryId).subscribe(
      (data)=>{
//        this.loadCategorias();
        this.loadCategoriasActivas();
        this.loadCategoriasInactivas();
      },
      (error)=>{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'Error activando categoria',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }
  desactivarCategoria(categoryId: string){
    this.gasSvc.desactivarCategoria(categoryId).subscribe(
      (data)=>{
//        this.loadCategorias();
        this.loadCategoriasActivas();
        this.loadCategoriasInactivas();
      },
      (error)=>{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'Error desactivando categoria',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

  editCategoria(categoria:any){
    this.selectedCategoria = null;
    this.selectedCategoria = categoria;
    this.gastosForm.patchValue({
      nombre: this.selectedCategoria.nombre,
      presupuesto: this.selectedCategoria.presupuesto
    });
    this.editarCategoria = true;
  }
  setCategoriaData(categoria:any){
    this.dataSvc.setCategoriaData(categoria);
    this.router.navigate(['gastos/agregar']);
  }
}
