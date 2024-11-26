import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { GruposPagosService } from '../../services/gruposPagos/grupos-pagos.service';

@Component({
  selector: 'app-grupos-single-pagos',
  standalone: true,
  imports: [],
  templateUrl: './grupos-single-pagos.component.html',
  styleUrl: './grupos-single-pagos.component.css'
})
export class GruposSinglePagosComponent {
  grupo: any;
  pagos:any;
  constructor(private router:Router, private dataSvc: DataServiceService, private gpoSvc: GruposPagosService){
    this.grupo = this.dataSvc.getGrupoData();
  }
  ngOnInit(){
    this.loadPagosGrupales(this.grupo.id_grupo);
  }
  loadPagosGrupales(id_grupo:string){
    console.log("entro aqui");  
    this.gpoSvc.getPagosGrupales(id_grupo).subscribe(
        (data)=>{
          this.pagos = data;
          console.log(data);
        },(error)=>{
          console.log("ERROR OBTENIENDO PAGOS")
        }
      )
  }

  setGrupo(grupo:any){
   this.dataSvc.setGrupoData(grupo);
   this.router.navigate(['grupos/pagos/agregar']);
  }
}
