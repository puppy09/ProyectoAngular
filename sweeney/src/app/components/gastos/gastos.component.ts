import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { PercentPipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [CarouselModule, SidebarComponent, MatMenuModule,MatButtonModule, MatIconModule],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css'
})
export class GastosComponent {

  categorias:any;
  constructor(private router:Router, private gasSvc: CategoriasService){}

  ngOnInit():void{
    this.loadCategorias();
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
  activarCategoria(categoryId: string){
    this.gasSvc.activarCategoria(categoryId).subscribe(
      (data)=>{
        this.loadCategorias();
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
        this.loadCategorias();
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
    this.router.navigate(['gastos','agregar']);
  }
}
