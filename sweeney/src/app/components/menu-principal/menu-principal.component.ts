import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovimientosService } from '../../services/movimientos/movimientos.service';

interface Cuenta{
  ID: number;
  no_cuenta: string;
  fecha_vencimiento: string;
  saldo: number;
  nombre: string;
  id_usuario: number;
  estatus: number;
  estatusDetail: {
    estatus: string;
  };
}

interface Movimiento{
  id_movimiento: string;
  id_usuario: string;
  id_pago: string;
  no_cuenta: string;
  descripcion: string;
  tipo_movimiento: string;
  monto: number;
  fecha: Date;
  movimientoDetail:{
    tipo_movimiento: string;
  }
}

interface Pagos{
  id_pago: number;
  id_usuario: number;
  no_cuenta: string;
  descripcion: string;
  monto: number;
  fecha: Date;
  pagos_hechos: number;
  total_pagos: number;
  category:{
    nombre: string;
  },
  negocio:{
    nombre: string;
  },
  tipospago:{
    tipo: string
  },
  estatuspago:{
    estatus_pagos: string;
  }
}
@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent  implements OnInit{
  cuentas: any;
  movimientos: any;

  constructor(private cuentasService: CuentasService, private movService: MovimientosService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.fetchCuentas();
    this.fetchMovimientos();
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
        this.snackBar.open('Error con movimientos '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching movimientos: ', error);
      })
  }
}
