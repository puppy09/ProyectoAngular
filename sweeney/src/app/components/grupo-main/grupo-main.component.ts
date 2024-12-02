import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../../services/dataService/data-service.service';
import Swal from 'sweetalert2';
import { GruposCreadosService } from '../../services/grupos/grupos-creados.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-grupo-main',
  standalone: true,
  imports: [RouterModule, SidebarComponent, CurrencyPipe],
  templateUrl: './grupo-main.component.html',
  styleUrl: './grupo-main.component.css'
})
export class GrupoMainComponent {
  grupo: any;
  pagos:any;
  constructor(private route: ActivatedRoute, private router:Router, private dataSvc: DataServiceService, private gpoSvc: GruposCreadosService){
    this.grupo = this.dataSvc.getGrupoData();
    console.log("grupo main "+this.grupo);
  }
  ngOnInit(){
    this.navigateToMovimientosGrupos();
  }
  navigateToPagosGrupos(): void{
    this.router.navigate(['single/pagos'], {relativeTo: this.route});
  }
  navigateToMovimientosGrupos():void{
    this.router.navigate(['single/movimientos'],{relativeTo:this.route});
  }
  navigateToPagosProgramados():void{
    this.router.navigate(['single/pagos/programados'],{relativeTo:this.route});
  }
  navigateToMovimientosProgramados():void{
    this.router.navigate(['single/movimientos/programados'],{relativeTo:this.route});
  }
  navigateToGastos():void{
    this.router.navigate(['grupos/gastos']);
  }
}
