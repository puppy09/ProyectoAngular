import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MovimientosService } from '../../services/movimientos/movimientos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Movimientos } from '../../interfaces/movimientos.interface';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CurrencyPipe, RouterModule,MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.css'
})
export class MovimientosComponent implements OnInit{
  movimientos: any;
  selectedComponent: string = '';

  constructor(private route: ActivatedRoute, private movSrv: MovimientosService, private snackBar: MatSnackBar, private router:Router){}

  ngOnInit(): void {
   this.navigateToMovimientos();
  }

  getMov():void{
    this.movSrv.getMovimientos().subscribe(
      (data)=>{
        this.movimientos = data;
      },
      (error)=>{
        const errorMessage = error.error?.message || 'Error al obtener cuentas';
        this.snackBar.open('Error con cuentas '+errorMessage, 'Cerrar',{
          duration: 5000
        })
        console.error('Error fetching cuentas: ', error);
      })
  }

  goToAdd():void{
    this.router.navigate(['movimientos','agregar']);
  }

  update(pago: Movimientos){
    this.router.navigate(['pagos','modificar',pago.id_movimiento],{state: {pago: pago}});
  }

 /*navigateTo(child: string): void{
    this,this.router.navigate([child], { relativeTo: this.router.url})
 }*/
  navigateToMovimientos(): void {
    this.router.navigate(['single/movimientos'], { relativeTo: this.route });
  }

  navigateToPagos(): void{
    this.router.navigate(['single/pagos'], {relativeTo: this.route});
  }
 /*navigateTo(child: string): void {
  this.router.navigate([child], { relativeTo: this.route }); // Use `this.route` for relative navigation
}*/
}
