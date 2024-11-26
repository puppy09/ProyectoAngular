import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { GruposMovimientosService } from '../../services/gruposMovimientos/grupos-movimientos.service';
import { SidebarComponent } from '../sidebar/sidebar.component';    
@Component({
  selector: 'app-grupos-single-movimientos-programados',
  standalone: true,
  imports: [],
  templateUrl: './grupos-single-movimientos-programados.component.html',
  styleUrl: './grupos-single-movimientos-programados.component.css'
})
export class GruposSingleMovimientosProgramadosComponent {
  grupo:any;
  movimientos:any;
  constructor(private router:Router, private dataSvc: DataServiceService, private gpoSvc: GruposMovimientosService){
    this.grupo = this.dataSvc.getGrupoData();
  }
  ngOnInit(){
    this.loadMovimientosProgramadosGrupales(this.grupo.id_grupo);
  }

  loadMovimientosProgramadosGrupales(id_grupo:string){
    this.gpoSvc.getMovimientosProgramadosGrupales(id_grupo).subscribe(
      (data)=>{
        console.log(data);
        this.movimientos=data;
      },(error)=>{
        console.log("ERROR OBTENIENDO MOVIMIENTOS");
      }
    )
  }

  setGrupo(grupo:any){
    this.dataSvc.setGrupoData(grupo);
    this.router.navigate(['grupos/movimientos/agregar']);
  }
}
