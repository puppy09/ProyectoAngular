import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { MovimientosProgService } from '../../services/movimientosProg/movimientos-prog.service';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

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
        const errorMessage = error.error?.message || 'Error al obtener movimientos programados';
        this.snackBar.open('Error con pagos programados '+errorMessage, 'Cerrar',{
          duration: 5000
      }
    )
  })
  }
  setMovimiento(movimiento: any){
    this.dataSvc.setmovProData(movimiento);
    this.router.navigate(['movimientos/programados/modificar',movimiento.id_movimientoprogramado]);
  }
  activarMovimiento(id_movimientoprogramado:number){
    this.movPro.activarMov(id_movimientoprogramado).subscribe(
        (data)=>{
          this.snackBar.open('Movimiento Activado ', 'Cerrar',{
            duration: 5000
        })}, (error)=>{
          const errorMessage = error.error?.message || 'Error al activando movimiento programado';
          this.snackBar.open('Error activando movimiento','Cerrar',{
            duration: 5000
        })
      }
    );
}
  desactivarMovimiento(id_movimientoprogramado:number){
    this.movPro.desactivarMov(id_movimientoprogramado).subscribe(
      (data)=>{
        this.snackBar.open('Movimiento Desactivcado ', 'Cerrar',{
          duration: 5000
      })}, (error)=>{
        const errorMessage = error.error?.message || 'Error al desactivando movimiento programado';
        this.snackBar.open('Error desactivando movimiento','Cerrar',{
          duration: 5000
      })
    }
  );
  }
}
