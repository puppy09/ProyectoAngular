import { Injectable } from '@angular/core';
import { MovProgramados } from '../../interfaces/mov-programados.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environtment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientosProgService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/movimientos/programados`;

  getMovimientosProg(): Observable<MovProgramados|MovProgramados[]>{
    return this.http.get<MovProgramados|MovProgramados[]>(this.apiUrl);
  }
  activarMov(id_movimientoprogramado: string):Observable<MovProgramados>{
    return this.http.patch<MovProgramados>(`${(this.apiUrl)}/activar/${id_movimientoprogramado}`,{});
  }
  desactivarMov(id_movimientoprogramado:string):Observable<MovProgramados>
  {
    return this.http.patch<MovProgramados>(`${(this.apiUrl)}/desactivar/${id_movimientoprogramado}`,{});
  }
}
