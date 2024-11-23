import { Component } from '@angular/core';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { MovimientosProgService } from '../../services/movimientosProg/movimientos-prog.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

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
  constructor(private snackBar: MatSnackBar, private dataSvc: DataServiceService, private router:Router, private movPro: MovimientosProgService){}

  ngOnInit(){
    this.loadMovimientosProgramados();
  }
  loadMovimientosProgramados(){
    this.movPro.getMovimientosProg().subscribe(
      (data)=>{
        console.log(data);
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
    console.log(movimiento);
    this.dataSvc.setmovProData(movimiento);
    this.router.navigate(['movimientos/programados/modificar',movimiento.id_movimientoProgramado]);
  }
  activarMovimiento(id_movimientoprogramado:string){
    this.movPro.activarMov(id_movimientoprogramado).subscribe(
        (data)=>{
          this.loadMovimientosProgramados();
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
  desactivarMovimiento(id_movimientoprogramado:string){
    console.log("ID movimiento Programado "+ id_movimientoprogramado);
    this.movPro.desactivarMov(id_movimientoprogramado).subscribe(
      (data)=>{
        this.loadMovimientosProgramados();
        this.snackBar.open('Movimiento Desactivcado ', 'Cerrar',{
          duration: 5000
      })}, (error)=>{
        const errorMessage = error.error?.message || 'Error al desactivando movimiento programado';
        this.snackBar.open('Error desactivando movimiento' + errorMessage,'Cerrar',{
          duration: 5000
      })
    }
  );
  }
}
