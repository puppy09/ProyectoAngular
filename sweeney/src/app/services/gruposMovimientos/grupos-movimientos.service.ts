import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gruposMovimientos, gruposMovimientosProgramados } from '../../interfaces/gruposPagos.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environtment';

@Injectable({
  providedIn: 'root'
})
export class GruposMovimientosService {
  private apiURL = `${environment.apiUrl}/movimientos_grupales`;

  constructor(private http: HttpClient) { }
  getMovimientosGrupales(id_grupo:string):Observable<gruposMovimientos|gruposMovimientos[]>{
    console.log("get movimientos grupales "+id_grupo);
    return this.http.get<gruposMovimientos|gruposMovimientos[]>(`${this.apiURL}/${id_grupo}`);
  }

  getMovimientosProgramadosGrupales(id_grupo:string):Observable<gruposMovimientosProgramados|gruposMovimientosProgramados[]>{
    return this.http.get<gruposMovimientosProgramados|gruposMovimientosProgramados[]>(`${this.apiURL}/programados/${id_grupo}`);
  }

  postMovimientosGrupales(id_grupo:number, no_cuenta:string, descripcion:string, monto:number):Observable<gruposMovimientos>{
    return this.http.post<gruposMovimientos>(`${this.apiURL}/add/${id_grupo}`,{no_cuenta, descripcion, monto});
  }

  postMovimientosProgramadosGrupales(id_grupo:number, no_cuenta:string, descripcion:string, monto:number, dia_depo:number):Observable<gruposMovimientosProgramados>{
    return this.http.post<gruposMovimientosProgramados>(`${this.apiURL}/add/programados/${id_grupo}`,{no_cuenta, monto, descripcion,dia_depo});
  }
  desactivarMovimientoProgramado(id_movimientoProgramado:string):Observable<gruposMovimientosProgramados>{
    return this.http.patch<gruposMovimientosProgramados>(`${this.apiURL}/desactivar/${id_movimientoProgramado}`,{});
  }
  activarMovimientoProgramado(id_movimientoProgramado:string):Observable<gruposMovimientosProgramados>{
    return this.http.patch<gruposMovimientosProgramados>(`${this.apiURL}/activar/${id_movimientoProgramado}`,{});
  }
  updMovimientoProgramado(id_movimientoProgramado:string, no_cuenta:string, descripcion:string, monto:number, dia_depo:number):Observable<gruposMovimientosProgramados>{
    return this.http.put<gruposMovimientosProgramados>(`${this.apiURL}/update/${id_movimientoProgramado}`,{no_cuenta, descripcion, monto, dia_depo});
  }


}
