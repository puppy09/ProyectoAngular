import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CuentasService } from '../../services/cuentas/cuentas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CurrencyPipe, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './cuentas.component.html',
  styleUrl: './cuentas.component.css'
})
export class CuentasComponent {

  cuentas: any;
  constructor(private cueSrv: CuentasService, private snackBar: MatSnackBar){}

  ngOnInit(): void{
    this.loadCuentas();
  }
  loadCuentas(): void{
    this.cueSrv.getCuentas().subscribe(
      (data)=>{
        this.cuentas=data;
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener cuentas';
        this.snackBar.open('Error con cuentas '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching cuentas: ', error);
      }
    )
  }
  activarCuentas(cuentaId:string): void{
    this.cueSrv.activarCuenta(cuentaId).subscribe(
      (data)=>{
        this.loadCuentas();
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener cuentas';
        this.snackBar.open('Error con cuentas '+errorMessage, 'Cerrar',{
          duration: 5000
        })
      })
  }
}
