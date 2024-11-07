import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovimientosService } from '../../services/movimientos/movimientos.service';
import { PagosService } from '../../services/pagos/pagos.service';
import { CurrencyPipe } from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [SidebarComponent, CurrencyPipe, CarouselModule],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent  implements OnInit{
  cuentas: any;
  movimientos: any;
  pagos: any;

  constructor(private cuentasService: CuentasService, private movService: MovimientosService, private pagoSrv: PagosService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.fetchCuentas();
    this.fetchMovimientos();
    this.fetchPagos();
  }

  fetchCuentas(): void {
    this.cuentasService.getCuentas().subscribe(
      (data) => {
        this.cuentas = data;
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener cuentas';
        this.snackBar.open('Error con cuentas '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching cuentas: ', error);
      })
  }

  fetchMovimientos(): void{
    this.movService.getMovimientos().subscribe(
      (data) =>{
        this.movimientos = data;
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener movimientos';
        this.snackBar.open('Error obteniendo mov '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching movimientos: ', error);
      })
  }

  fetchPagos(): void{
    this.pagoSrv.getPagos().subscribe(
    (data) =>{
      this.pagos = data;
    },
    (error)=>{
      const errorMessage = error.error?.message || 'Error al obtener pagos';
        this.snackBar.open('Error Obteniendo Pagos '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching pagos: ', error);
    })
  }
}
