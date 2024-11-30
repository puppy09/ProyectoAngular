import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { GruposPagosService } from '../../services/gruposPagos/grupos-pagos.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-grupos-single-pagos',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './grupos-single-pagos.component.html',
  styleUrl: './grupos-single-pagos.component.css'
})
export class GruposSinglePagosComponent {
  grupo: any;
  pagos:any;
  usuario:any;
  constructor(private router:Router, private dataSvc: DataServiceService, private gpoSvc: GruposPagosService, private authSvc: AuthService){
    this.grupo = this.dataSvc.getGrupoData();
  }
  ngOnInit(){
    this.loadPagosGrupales(this.grupo.id_grupo);
    this.userInfo();
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

  userInfo():void{
    this.authSvc.userInfo().subscribe(
      (data)=>{
        this.usuario = data;
        console.log(this.usuario);
      })
  }
  editarPagoPro(pago:any){
    console.log("ENTRO A EDITAR PAGO PROGRAMADO "+pago);
    console.log(pago.no_cuenta);
    this.dataSvc.clearPagoGrupalData();
    this.dataSvc.setPagoGrupalData(pago);
    console.log("EDITAR PAGO PROGRAMADO",pago);
    this.router.navigate(['grupos/pagos/modificar/',pago.id_pago]);
  }

}
