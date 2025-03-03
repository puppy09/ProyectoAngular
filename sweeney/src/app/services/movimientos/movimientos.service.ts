import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environtment';
import { Observable } from 'rxjs';
import { Movimientos } from '../../interfaces/movimientos.interface';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/movimientos`;

  getMovimientos():Observable<Movimientos|Movimientos[]>{
    console.log(this.apiUrl);
    return this.http.get<Movimientos|Movimientos[]>(this.apiUrl);
  }
  getMovimientosByCuenta(noCuenta: string):Observable<Movimientos|Movimientos[]>{
    return this.http.post<Movimientos|Movimientos[]>(`${this.apiUrl}/by/cuenta`,{noCuenta});
  }

  postFondos(no_cuenta: string, descripcion: string, monto: number):Observable<Movimientos>{
    console.log("Servicio de posteado");
    return this.http.post<Movimientos>(`${this.apiUrl}`,{monto, no_cuenta, descripcion});
  }

  postFondosProgramados(no_cuenta: string, descripcion: string, monto: number, diaPago: number):Observable<Movimientos>{
    return this.http.post<Movimientos>(`${this.apiUrl}/programados`,{monto, no_cuenta, descripcion, dia_depo:diaPago});
  }
}
