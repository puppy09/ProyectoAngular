import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gruposMovimientos } from '../../interfaces/gruposPagos.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environtment';

@Injectable({
  providedIn: 'root'
})
export class GruposMovimientosService {
  private apiURL = `${environment.apiUrl}/movimientos_grupales`;

  constructor(private http: HttpClient) { }
  getMovimientosGrupales(id_grupo:string):Observable<gruposMovimientos|gruposMovimientos[]>{
    return this.http.get<gruposMovimientos|gruposMovimientos[]>(`${this.apiURL}/${id_grupo}`);
  }
}
