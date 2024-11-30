import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { GruposMovimientosService } from '../../services/gruposMovimientos/grupos-movimientos.service';
import { SidebarComponent } from '../sidebar/sidebar.component';    
import { AuthService } from '../../services/auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-grupos-single-movimientos-programados',
  standalone: true,
  imports: [MatMenuModule,CurrencyPipe,MatIconModule,MatButtonModule],
  templateUrl: './grupos-single-movimientos-programados.component.html',
  styleUrl: './grupos-single-movimientos-programados.component.css'
})
export class GruposSingleMovimientosProgramadosComponent {
  grupo:any;
  movimientos:any;
  usuario:any;
  constructor(private router:Router, private dataSvc: DataServiceService, private gpoSvc: GruposMovimientosService, private authSvc: AuthService){
    this.grupo = this.dataSvc.getGrupoData();
  }
  ngOnInit(){
    this.loadMovimientosProgramadosGrupales(this.grupo.id_grupo);
    this.userInfo();
  }

  loadMovimientosProgramadosGrupales(id_grupo:string){
    this.gpoSvc.getMovimientosProgramadosGrupales(id_grupo).subscribe(
      (data)=>{
        console.log(data);
        this.movimientos=data;
      },(error)=>{
        console.log("ERROR OBTENIENDO MOVIMIENTOS");
      }
    )
  }

  setGrupo(grupo:any){
    this.dataSvc.setGrupoData(grupo);
    this.router.navigate(['grupos/movimientos/agregar']);
  }

  userInfo():void{
    this.authSvc.userInfo().subscribe(
      (data)=>{
        this.usuario = data;
        console.log(this.usuario);
      }
    )
  }
  desactivarMovimiento(id_movimientoProgramado:string){
    this.gpoSvc.desactivarMovimientoProgramado(id_movimientoProgramado).subscribe(
      (data)=>{
        Swal.fire({
          title: 'Movimiento Desactivado',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          timer: 1500
        })
        this.loadMovimientosProgramadosGrupales(this.grupo.id_grupo);
      },(error)=>{
        console.log("ERROR DESACTIVANDO MOVIMIENTO PROGRAMADO");
        Swal.fire({
          title: 'Error al Desactivando Movimiento',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          timer: 1500
        });
      }
    )
  }

  activarMovimiento(id_movimientoProgramado:string){
    this.gpoSvc.activarMovimientoProgramado(id_movimientoProgramado).subscribe(
      (data)=>{
        Swal.fire({
          title: 'Movimiento Activado',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          timer: 1500
        })
        this.loadMovimientosProgramadosGrupales(this.grupo.id_grupo);
      },(error)=>{
        console.log("ERROR ACTIVANDO MOVIMIENTO PROGRAMADO");
        Swal.fire({
          title: 'Error Activando Movimiento',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          timer: 1500
        });
      }
    )
  }
}
