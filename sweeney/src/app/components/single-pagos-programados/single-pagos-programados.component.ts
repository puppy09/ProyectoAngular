import { Component } from '@angular/core';
import { PagosProgService } from '../../services/pagosProg/pagos-prog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-single-pagos-programados',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './single-pagos-programados.component.html',
  styleUrl: './single-pagos-programados.component.css'
})
export class SinglePagosProgramadosComponent {

  pagosPro: any;
  constructor(private router: Router, private dataSvc: DataServiceService, private pagProSvc: PagosProgService, private snackBar: MatSnackBar){}
  
  ngOnInit(){
    this.getPagosProgramados();
  }

  getPagosProgramados(){
    this.pagProSvc.getPagoProgramado().subscribe(
      (data)=>{
        this.pagosPro=data;
        console.log(this.pagosPro);
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener pagos programados';
        this.snackBar.open('Error con pagos programados '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching pagos programados: ', error);
      })
  }
}
