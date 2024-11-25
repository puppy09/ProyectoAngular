import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { MovimientosService } from '../../services/movimientos/movimientos.service';
import { PagosService } from '../../services/pagos/pagos.service';
import { CurrencyPipe } from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
import { HeaderComponent } from "../header/header.component";
import { AuthService } from '../../services/auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DataServiceService } from '../../services/dataService/data-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [SidebarComponent, CurrencyPipe, CarouselModule, HeaderComponent, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent  implements OnInit{
  cuentas: any;
  movimientos: any;
  pagos: any;
  usuario: any;
  saldo:any;
  totalGastado: any;
  constructor(private cueSrv:CuentasService, private pagSvc: PagosService, private dataSvc:DataServiceService, private router:Router, private userSvc: AuthService,  private cuentasService: CuentasService, private movService: MovimientosService, private pagoSrv: PagosService) {}
  ngOnInit(): void {
    this.fetchCuentas();
    this.fetchMovimientos();
    this.fetchPagos();
    this.userInfo();
    this.getSldos();
    this.infoGastos();
  }

  getSldos(): void{
    this.cuentasService.getSaldoTotal().subscribe(
      (data)=>{
        console.log(data);
        this.saldo = data;
      },
      (error)=>{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'No se ha cargado saldo total',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }
  fetchCuentas(): void {
    this.cuentasService.getCuentas().subscribe(
      (data) => {
        this.cuentas = data;
      },
      (error)=>{
        console.log("Error cargando Cuentas" + error.error?.message);
  })}

  fetchMovimientos(): void{
    this.movService.getMovimientos().subscribe(
      (data) =>{
        this.movimientos = data;
      },
      (error)=>{
        console.log("Error cargando Movimientos" + error.error?.message);
      })
  }

  fetchPagos(): void{
    this.pagoSrv.getPagos().subscribe(
    (data) =>{
      console.log(data);
      this.pagos = data;
    },
    (error)=>{
      
      console.log("Error cargando pagos "+ error.error?.message);
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
      })
  }

  selectCuenta(noCuenta: string):void{
    this.movService.getMovimientosByCuenta(noCuenta).subscribe(
      (data)=>{
        this.movimientos = data;
      },
      (error)=>{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'No hay cuentas del usuario',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  infoGastos():void{
    this.pagSvc.getTotalGastado().subscribe(
      (data)=>{
        this.totalGastado=data
        console.log(this.totalGastado);
      },(error)=>{
        console.log("Error Obteniendo total gastado");
      }
    )
  }

  activarCuentas(cuentaId:string): void{
    this.cueSrv.activarCuenta(cuentaId).subscribe(
      (data)=>{
        this.fetchCuentas();
      },
      (error)=>{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'Error Activando Cuenta',
          showConfirmButton: false,
          timer: 1500
        })
        })
  }
  desactivarCuentas(cuentaId: string): void{
    this.cueSrv.desactivarCuenta(cuentaId).subscribe(
      (data)=>{
        this.fetchCuentas();
      },
      (error)=>{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'Error Desactivando Cuenta',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }
  gotoAdd():void{
    this.router.navigate(['movimientos','fondos','añadir']);
  }
  setCuenta2(cuenta:any){
    this.dataSvc.setCuentaData(cuenta);
    this.router.navigate(['movimientos/fondos/añadir',cuenta.ID])
  }
}
