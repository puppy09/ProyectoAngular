import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { MovimientosProgService } from '../../services/movimientosProg/movimientos-prog.service';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-movimientos-programados',
  standalone: true,
  imports: [MatMenuModule,MatButtonModule,MatIconModule],
  templateUrl: './movimientos-programados.component.html',
  styleUrl: './movimientos-programados.component.css'
})
export class MovimientosProgramadosComponent {

  movimientosProgramados: any;
  constructor(private movPro: MovimientosProgService, private dataSvc:DataServiceService, private snackBar: MatSnackBar, private router: Router){}
  loadMovimientosProgramados(){
    this.movPro.getMovimientosProg().subscribe(
      (data)=>{
        this.movimientosProgramados = data;
      },(error)=>{
        console.log(error.error?.message);
      }
  )}
  setMovimiento(movimiento: any){
    this.dataSvc.setmovProData(movimiento);
    this.router.navigate(['movimientos/programados/modificar',movimiento.id_movimientoprogramado]);
  }
  activarMovimiento(id_movimientoprogramado:string){
    this.movPro.activarMov(id_movimientoprogramado).subscribe(
        (data)=>{
          this.loadMovimientosProgramados();
        }, (error)=>{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: 'Error Activando Movimiento',
            showConfirmButton: false,
            timer: 1500
          })
      }
    );
}
  desactivarMovimiento(id_movimientoprogramado:string){
    this.movPro.desactivarMov(id_movimientoprogramado).subscribe(
      (data)=>{
        this.loadMovimientosProgramados();
      }, (error)=>{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'Error Desactivando Movimiento',
          showConfirmButton: false,
          timer: 1500
        })
    }
  );
  }
}
