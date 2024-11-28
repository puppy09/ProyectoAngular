import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { CurrencyPipe } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { CarouselModule } from 'primeng/carousel';
import 'flowbite';
import { MovimientosProgService } from '../../services/movimientosProg/movimientos-prog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [SidebarComponent, CurrencyPipe, MatMenuModule, MatButtonModule, MatIconModule, CarouselModule],
  templateUrl: './cuentas.component.html',
  styleUrl: './cuentas.component.css'
})
export class CuentasComponent {

  cuentas: any;
  inactivas: any;
  activas: any;
  movimientosProgramados: any;
  constructor(private movPro: MovimientosProgService, private dataSvc:DataServiceService, private cueSrv: CuentasService, private router: Router){}

  ngOnInit(): void{
    this.loadCuentas();
    this.loadCuentasInactivas();
    this.loadCuentasActivas();
  }
  loadCuentas(): void{
    this.cueSrv.getCuentas().subscribe(
      (data)=>{
        this.cuentas=data;
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener cuentas';
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }
  loadCuentasActivas(): void{
    this.cueSrv.getCuentasActivas().subscribe(
      (data)=>{
        this.activas=data;
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener cuentas';
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  loadCuentasInactivas(): void{
    this.cueSrv.getCuentasInactivas().subscribe(
      (data)=>{
        this.inactivas=data;
        console.log(this.inactivas);
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener cuentas';
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }
  activarCuentas(cuentaId:string): void{
    this.cueSrv.activarCuenta(cuentaId).subscribe(
      (data)=>{
        this.loadCuentasActivas();
        this.loadCuentasInactivas();
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
        this.loadCuentasActivas();
        this.loadCuentasInactivas();
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
    this.router.navigate(['cuentas','agregar']);
  }

  setCuenta(cuenta:any){
    this.dataSvc.setCuentaData(cuenta);
      this.router.navigate(['cuentas/modificar',cuenta.ID])
      
  }
  setCuenta2(cuenta:any){
    this.dataSvc.setCuentaData(cuenta);
    this.router.navigate(['movimientos/fondos/añadir',cuenta.ID])
  }

 
}