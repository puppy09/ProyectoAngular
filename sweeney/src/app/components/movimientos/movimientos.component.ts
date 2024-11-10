import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MovimientosService } from '../../services/movimientos/movimientos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import { routes } from '../../app.routes';
import { Route, Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MovimientosFormComponent } from '../movimientos-form/movimientos-form.component';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CurrencyPipe, RouterModule],
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.css'
})
export class MovimientosComponent implements OnInit{
  movimientos: any;

  constructor(private route: ActivatedRoute, private movSrv: MovimientosService, private snackBar: MatSnackBar, private router:Router){}

  ngOnInit(): void {
   this.getMov(); 
  }

  getMov():void{
    this.movSrv.getMovimientos().subscribe(
      (data)=>{
        this.movimientos = data;
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener cuentas';
        this.snackBar.open('Error con cuentas '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching cuentas: ', error);
      })
  }

  goToAdd():void{
    this.router.navigate(['movimientos','agregar']);
  }
}
