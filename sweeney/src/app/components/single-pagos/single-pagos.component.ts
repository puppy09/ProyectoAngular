import { Component } from '@angular/core';
import { PagosProgService } from '../../services/pagosProg/pagos-prog.service';
import { PagosService } from '../../services/pagos/pagos.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-pagos',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, CurrencyPipe],
  templateUrl: './single-pagos.component.html',
  styleUrl: './single-pagos.component.css'
})
export class SinglePagosComponent {

  pagos: any;
  constructor(private dataSvc:DataServiceService, private router: Router, private pagoSrv: PagosService){}
  ngOnInit():void{
    this.getPagos();
  }

  getPagos():void{
    this.pagoSrv.getPagos().subscribe(
      (data)=>{
        this.pagos = data;
      },
      (error)=>{
        console.error('Error fetching pagos: ', error);
      })
  }
  reembolsarPago(pagoId: string):void{
    this.pagoSrv.reembolsarPago(pagoId).subscribe(
      (data)=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: 'Pago reembolsado exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.getPagos();
      },
      (error)=>{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: 'Error Reembolsando Pago',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

  
  setPago(pago: any){
    this.dataSvc.setPagoData(pago);
    this.router.navigate(['pagos/modificar',pago.id_pago])
  }
}
