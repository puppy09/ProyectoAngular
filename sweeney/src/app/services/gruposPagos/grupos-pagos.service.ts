import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { gruposPagos, gruposPagosProgramados } from '../../interfaces/gruposPagos.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environtment';

@Injectable({
  providedIn: 'root'
})
export class GruposPagosService {

  constructor(private http: HttpClient) { }
  private apiURL = `${environment.apiUrl}/pagosGrupos`;
  getPagosGrupales(id_grupo:string): Observable<gruposPagos|gruposPagos[]>{
    return this.http.get<gruposPagos|gruposPagos[]>(`${this.apiURL}/${id_grupo}`);
  }

  getPagosProgramadosGrupales(id_grupo:string):Observable<gruposPagosProgramados|gruposPagosProgramados[]>{
    return this.http.get<gruposPagosProgramados|gruposPagosProgramados[]>(`${this.apiURL}/programados/${id_grupo}`);
  }

  postPagoGrupal(id_grupo:number, no_cuenta:string, descripcion:string, monto:number, categoria:number, subcategoria:number):Observable<gruposPagos>{
    return this.http.post<gruposPagos>(`${this.apiURL}/${id_grupo}`,{no_cuenta, descripcion, monto, categoria, subcategoria});
  }

  postPagoProgramadoGrupal(id_grupo:number, no_cuenta:string, descripcion:string, monto:number, categoria:number, subcategoria:number, dia_pago:number, total_pagos:number):Observable<gruposPagosProgramados>{
    return this.http.post<gruposPagosProgramados>(`${this.apiURL}/programado/${id_grupo}`,{no_cuenta, descripcion, monto, categoria, subcategoria, dia_pago, total_pagos});
  }
  updatePagoProgramadoGrupal(id_pago:number, grupo:string, no_cuenta:string, descripcion:string, monto:number, categoria:number, subcategoria:number, dia_pago:number, total_pagos:number):Observable<gruposPagosProgramados|gruposPagosProgramados[]>{
    return this.http.put<gruposPagosProgramados|gruposPagosProgramados[]>(`${this.apiURL}/update/${id_pago}`,{grupo, no_cuenta, descripcion, monto, categoria, subcategoria, dia_pago, total_pagos});
  }

  updatePagoGrupal(grupo:number,  id_pago:number, no_cuenta: string, descripcion:string, monto: number, categoria:number, subcategoria: number):Observable<gruposPagos|gruposPagos[]>{
    console.log("SERVICIO");
    console.log("id_pago "+id_pago);
    console.log("no_cuenta "+no_cuenta);
    console.log("descripcion "+descripcion);
    console.log("monto "+monto);
    console.log("categoria "+categoria);
    console.log("subcategoria "+subcategoria);
    return this.http.put<gruposPagos|gruposPagos[]>(`${this.apiURL}/${id_pago}`,{grupo, no_cuenta, descripcion, monto, categoria, subcategoria});
  }
}
