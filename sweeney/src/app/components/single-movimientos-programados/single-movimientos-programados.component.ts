import { Component } from '@angular/core';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { MovimientosProgService } from '../../services/movimientosProg/movimientos-prog.service';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-single-movimientos-programados',
  standalone: true,
  imports: [MatMenuModule,MatButtonModule,MatIconModule,CurrencyPipe],
  templateUrl: './single-movimientos-programados.component.html',
  styleUrl: './single-movimientos-programados.component.css'
})
export class SingleMovimientosProgramadosComponent {
  movimientos: any;
  movimientosProgramados:any;
  constructor(private dataSvc: DataServiceService, private router:Router, private movPro: MovimientosProgService, private authSvc: AuthService){}

  ngOnInit(){
    this.loadMovimientosProgramados();
  }
  loadMovimientosProgramados(){
    this.movPro.getMovimientosProg().subscribe(
      (data)=>{
        this.movimientosProgramados = data;
      },(error)=>{
        console.log("Error cargando movimientos programados")
      })
  }
  setMovimiento(movimiento: any){
    console.log(movimiento);
    this.dataSvc.setmovProData(movimiento);
    this.router.navigate(['movimientos/programados/modificar',movimiento.id_movimientoProgramado]);
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
    console.log("ID movimiento Programado "+ id_movimientoprogramado);
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
