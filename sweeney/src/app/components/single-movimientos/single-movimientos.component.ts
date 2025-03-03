import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovimientosService } from '../../services/movimientos/movimientos.service';
import { CurrencyPipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-single-movimientos',
  standalone: true,
  imports: [CurrencyPipe, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './single-movimientos.component.html',
  styleUrl: './single-movimientos.component.css'
})
export class SingleMovimientosComponent {
  movimientos: any;

  constructor(private route: ActivatedRoute, private movSrv: MovimientosService, private router:Router){}

  ngOnInit(): void {
   this.getMov(); 
  }

  getMov():void{
    this.movSrv.getMovimientos().subscribe(
      (data)=>{
        this.movimientos = data;
      },
      (error)=>{
        console.error('Error fetching movimientos: ', error);
      })
  }
}
