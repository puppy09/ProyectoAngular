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
}
