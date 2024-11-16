import { Component } from '@angular/core';
import { PagosProgService } from '../../services/pagosProg/pagos-prog.service';
import { PagosService } from '../../services/pagos/pagos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-pagos',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './single-pagos.component.html',
  styleUrl: './single-pagos.component.css'
})
export class SinglePagosComponent {

  pagos: any;
  constructor(private dataSvc:DataServiceService, private router: Router, private pagoSrv: PagosService, private snackBar: MatSnackBar){}
  ngOnInit():void{
    this.getPagos();
  }

  getPagos():void{
    this.pagoSrv.getPagos().subscribe(
      (data)=>{
        this.pagos = data;
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener pagos';
        this.snackBar.open('Error con pagos '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching pagos: ', error);
      })
  }
  reembolsarPago(pagoId: string):void{
    this.pagoSrv.reembolsarPago(pagoId).subscribe(
      (data)=>{
        this.getPagos();
        this.snackBar.open('Pago Reembolsado', 'Cerrar',{
          duration: 5000
        });
      },
      (error)=>{
        this.snackBar.open('Error Reembolsando Pago','Cerrar',{
          duration: 5000
        })
      })
  }

  
  setPago(pago: any){
    this.dataSvc.setPagoData(pago);
    this.router.navigate(['pagos/modificar',pago.id_pago])
  }
}
