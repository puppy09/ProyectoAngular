import { Component } from '@angular/core';
import { PagosProgService } from '../../services/pagosProg/pagos-prog.service';
import { PagosService } from '../../services/pagos/pagos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-single-pagos',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './single-pagos.component.html',
  styleUrl: './single-pagos.component.css'
})
export class SinglePagosComponent {

  pagos: any;
  constructor(private pagoSrv: PagosService, private snackBar: MatSnackBar){}
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

}
