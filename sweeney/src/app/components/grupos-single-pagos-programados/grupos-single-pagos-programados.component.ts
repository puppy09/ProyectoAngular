import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { GruposPagosService } from '../../services/gruposPagos/grupos-pagos.service';


@Component({
  selector: 'app-grupos-single-pagos-programados',
  standalone: true,
  imports: [],
  templateUrl: './grupos-single-pagos-programados.component.html',
  styleUrl: './grupos-single-pagos-programados.component.css'
})
export class GruposSinglePagosProgramadosComponent {
  grupo: any;
  pagosProgramados:any;
  constructor(private router:Router, private dataSvc: DataServiceService, private gpoSvc: GruposPagosService){
    this.grupo = this.dataSvc.getGrupoData();
  }
  ngOnInit(){
    this.loadPagosProgramados(this.grupo.id_grupo);
  }
  loadPagosProgramados(id_grupo:string){
    this.gpoSvc.getPagosProgramadosGrupales(id_grupo).subscribe(
      (data)=>{
        this.pagosProgramados=data;
      },(error)=>{
        console.log("Error obteniendo pagos");
      }
    )
  }
}
