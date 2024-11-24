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
import Swal from 'sweetalert2';

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
        console.log("Error obteniendo movimientos");
      })
  }

  goToAdd():void{
    this.router.navigate(['movimientos','agregar']);
  }

  navigateToMovimientos(): void {
    this.router.navigate(['single/movimientos'], { relativeTo: this.route });
  }

  navigateToPagos(): void{
    this.router.navigate(['single/pagos'], {relativeTo: this.route});
  }

  navigateToPagosProgramados(): void{
    this.router.navigate(['single/pagosProgramados'],{relativeTo: this.route})
  }
  navigateToMovimientosProgramados(): void{
    this.router.navigate(['single/movimientosProgramados'],{relativeTo: this.route})
  }
}