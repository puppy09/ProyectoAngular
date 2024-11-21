import { Component } from '@angular/core';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { MovimientosProgService } from '../../services/movimientosProg/movimientos-prog.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-single-movimientos-programados',
  standalone: true,
  imports: [],
  templateUrl: './single-movimientos-programados.component.html',
  styleUrl: './single-movimientos-programados.component.css'
})
export class SingleMovimientosProgramadosComponent {
  movimientos: any;
  constructor(private snackBar: MatSnackBar, private dataSvc: DataServiceService, private router:Router, private movProSvc: MovimientosProgService){}

  ngOnInit():void{
    this.getMovimientosProgramados();
  }
  
  getMovimientosProgramados():void{
    this.movProSvc.getMovimientosProg().subscribe(
      (data)=>{
        this.movimientos=data;
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener fondos programados';
        this.snackBar.open('Error con fondos programados '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching pagos: ', error);
      });
  }
}
