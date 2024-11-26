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
}
