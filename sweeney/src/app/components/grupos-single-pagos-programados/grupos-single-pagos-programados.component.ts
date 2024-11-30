import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../../services/dataService/data-service.service';
import { GruposPagosService } from '../../services/gruposPagos/grupos-pagos.service';
import { AuthService } from '../../services/auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-grupos-single-pagos-programados',
  standalone: true,
  imports: [MatMenuModule,MatIconModule,MatButtonModule],
  templateUrl: './grupos-single-pagos-programados.component.html',
  styleUrl: './grupos-single-pagos-programados.component.css'
})
export class GruposSinglePagosProgramadosComponent {
  grupo: any;
  pagosProgramados:any;
  usuario:any;
  constructor(private router:Router, private dataSvc: DataServiceService, private gpoSvc: GruposPagosService, private authSvc: AuthService){
    this.grupo = this.dataSvc.getGrupoData();
  }
  ngOnInit(){
    this.loadPagosProgramados(this.grupo.id_grupo);
    this.userInfo();
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
  userInfo():void{
    this.authSvc.userInfo().subscribe(
      (data)=>{
        this.usuario = data;
        console.log(this.usuario);
      })
  }
  editarPagoPro(pago:any){
    this.dataSvc.setPagoGrupalProData(pago);
    console.log("EDITAR PAGO PROGRAMADO",pago);
    this.router.navigate(['grupos/pagos/programados/modificar/',pago.id_pago]);
  }
}
