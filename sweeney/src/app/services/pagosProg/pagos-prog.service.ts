import { Injectable } from '@angular/core';
import { pagosProgramados } from '../../interfaces/pagosProgramados.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environtment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosProgService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/pagos/programado`;


  postPagoProgramado(num_cuenta: string,descripcion:string,monto:number,categoria:number,subcategoria:number,dia_pago:number,total_pagos:number):Observable<pagosProgramados|pagosProgramados[]>{
    return this.http.post<pagosProgramados|pagosProgramados[]>(`${this.apiUrl}`,{num_cuenta,descripcion,monto,categoria,subcategoria,dia_pago,total_pagos});
  }

  getPagoProgramado():Observable<pagosProgramados|pagosProgramados[]>{
    return this.http.get<pagosProgramados|pagosProgramados[]>(this.apiUrl);
  }
  updPagoProgramado(pagoId: string, num_cuenta: string, descripcion: string, monto: number, categoria: number, subcategoria: number, dia_pago:number, total_pagos:number):Observable<pagosProgramados|pagosProgramados[]>{
    return this.http.put<pagosProgramados|pagosProgramados[]>(`${this.apiUrl}/programado/update/${pagoId}`,{no_cuenta: num_cuenta,descripcion,monto,categoria,subcategoria, dia_pago, total_pagos});
  }
}
