import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environtment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagos } from '../../interfaces/pagos.interface';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/pagos`;

  getPagos():Observable<Pagos|Pagos[]>{
    console.log(this.apiUrl);
    return this.http.get<Pagos|Pagos[]>(this.apiUrl);
  }
  getPagosByCuenta(noCuenta: string):Observable<Pagos|Pagos[]>{
    return this.http.post<Pagos|Pagos[]>(`${this.apiUrl}/by/cuenta`,{noCuenta});
  }
  postPago(num_cuenta: string, descripcion: string, monto:number,categoria:number,subcategoria:number):Observable<Pagos|Pagos[]>{
    return this.http.post<Pagos|Pagos[]>(`${this.apiUrl}`,{num_cuenta,descripcion,monto,categoria,subcategoria});
  }
  postPagoProgramado(num_cuenta: string, descripcion: string, monto:number,categoria:number,subcategoria:number, dia_pago:number, total_pagos: number):Observable<Pagos|Pagos[]>{
    return this.http.post<Pagos|Pagos[]>(`${this.apiUrl}`,{num_cuenta,descripcion,monto,categoria,subcategoria, dia_pago, total_pagos});
  }

 
}
