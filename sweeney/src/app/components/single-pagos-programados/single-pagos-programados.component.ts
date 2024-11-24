import { Component } from '@angular/core';
import { PagosProgService } from '../../services/pagosProg/pagos-prog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { Route, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-single-pagos-programados',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule, CurrencyPipe],
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
      },
      (error)=>{
        console.error('Error fetching pagos programados: ', error);
      })
  }

  setPago(pago: any){
    console.log(pago);
    this.dataSvc.setPagoData(pago);
    this.router.navigate(['pagos/programados/modificar', pago.id_pagoprogramado]);
  }
}
