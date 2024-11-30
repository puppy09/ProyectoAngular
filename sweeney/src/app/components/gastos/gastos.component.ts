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

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [CarouselModule, SidebarComponent, MatMenuModule,MatButtonModule, MatIconModule, RouterModule, GastosFormComponent, ReactiveFormsModule],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css'
})
export class GastosComponent {

  categorias:any;
  categoriasInactivas:any;
  categoriasActivas:any;
  gastosForm: FormGroup = new FormGroup({});
  constructor(private router:Router, private gasSvc: CategoriasService, private route: ActivatedRoute){}


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

  goToAdd(){
    this.router.navigate(['agregar'],{relativeTo: this.route});
    this.loadCategorias();
  }
}
