import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { GruposMovimientosService } from '../../services/gruposMovimientos/grupos-movimientos.service';
@Component({
  selector: 'app-grupos-single-movimientos',
  standalone: true,
  imports: [],
  templateUrl: './grupos-single-movimientos.component.html',
  styleUrl: './grupos-single-movimientos.component.css'
})
export class GruposSingleMovimientosComponent {
  grupo:any;
  movimientos:any;
  constructor(private router:Router, private dataSvc: DataServiceService, private gpoSvc: GruposMovimientosService){
    this.grupo = this.dataSvc.getGrupoData();
  }

  ngOnInit(){
    this.loadMovimientosGrupales(this.grupo.id_grupo);
  }
  loadMovimientosGrupales(id_grupo:string){
    this.gpoSvc.getMovimientosGrupales(id_grupo).subscribe(
      (data)=>{
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
