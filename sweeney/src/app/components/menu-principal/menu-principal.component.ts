import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovimientosService } from '../../services/movimientos/movimientos.service';
import { PagosService } from '../../services/pagos/pagos.service';
import { CurrencyPipe } from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
import { HeaderComponent } from "../header/header.component";
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [SidebarComponent, CurrencyPipe, CarouselModule, HeaderComponent],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent  implements OnInit{
  cuentas: any;
  movimientos: any;
  pagos: any;
  usuario: any;

  constructor(private userSvc: AuthService,  private cuentasService: CuentasService, private movService: MovimientosService, private pagoSrv: PagosService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.fetchCuentas();
    this.fetchMovimientos();
    this.fetchPagos();
    this.userInfo();
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

  userInfo():void{
    this.userSvc.userInfo().subscribe(
      (data)=>{
        this.usuario = data;
        console.log(data);
      },
      (error)=>{
        console.log("error obteniendo la informacion del usuario", error);
        const errorMessage = error.error?.message || 'Error al obtener informacion del usuario';
        this.snackBar.open('Error Obteniendo informacion del usuario '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching user: ', error);
      })
  }

  selectCuenta(noCuenta: string):void{
    this.movService.getMovimientosByCuenta(noCuenta).subscribe(
      (data)=>{
        this.movimientos = data;
      },
      (error)=>{
        console.log("error obteniendo la pagos del usuario", error);
        const errorMessage = error.error?.message || 'Error al obtener pagos del usuario';
        this.snackBar.open('Error Obteniendo pagos del usuario '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching user: ', error);
      }
    )
  }
}
