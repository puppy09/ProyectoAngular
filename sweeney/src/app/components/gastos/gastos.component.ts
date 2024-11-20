import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PercentPipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, MatMenuModule,MatButtonModule, MatIconModule],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css'
})
export class GastosComponent {

  categorias:any;
  constructor(private router:Router, private gasSvc: CategoriasService, private snackBar: MatSnackBar){}

  ngOnInit():void{
    this.loadCategorias();
  }
  loadCategorias(){
    this.gasSvc.getCategorias().subscribe(
      (data)=>{
        this.categorias = data;
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener gastos';
        this.snackBar.open('Error con gastos '+errorMessage, 'Cerrar',{
          duration: 5000
        });
      })
  }
  activarCategoria(categoryId: string){
    this.gasSvc.activarCategoria(categoryId).subscribe(
      (data)=>{
        this.loadCategorias();
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error activando categoria';
        this.snackBar.open('Error con categorias '+errorMessage, 'Cerrar',{
          duration: 5000
        })
      })
  }
  desactivarCategoria(categoryId: string){
    this.gasSvc.desactivarCategoria(categoryId).subscribe(
      (data)=>{
        this.loadCategorias();
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error desactivando categoria';
        this.snackBar.open('Error con categorias '+errorMessage, 'Cerrar',{
          duration: 5000
        })
      })
  }

  goToAdd(){
    this.router.navigate(['gastos','agregar']);
  }
}
