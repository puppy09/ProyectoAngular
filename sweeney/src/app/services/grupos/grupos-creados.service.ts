import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environtment';
import { HttpClient } from '@angular/common/http';
import { gruposCreados, gruposMiembro } from '../../interfaces/gruposCreados.interface';
import { gruposPagos } from '../../interfaces/gruposPagos.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruposCreadosService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/grupos`;
  private apiURL2 = `${environment.apiUrl}/pagosGrupos`;

  getGruposCreados(): Observable<gruposCreados|gruposCreados[]>{
    return this.http.get<gruposCreados|gruposCreados[]>(`${this.apiUrl}/creados`);
  }

  getGruposMiembro(): Observable<gruposMiembro|gruposMiembro[]>{
    return this.http.get<gruposMiembro|gruposMiembro[]>(`${this.apiUrl}/miembro`);
  }

  joinGrupo(token:string):Observable<JSON>{
    return this.http.post<JSON>(`${this.apiUrl}/unirse`,{token});
  }

  crearGrupo(nombre:string, descripcion:string):Observable<gruposCreados>{
    return this.http.post<gruposCreados>(`${this.apiUrl}`,{nombre, descripcion});
  }

  getPagosGrupales(id_grupo:string): Observable<gruposPagos|gruposPagos[]>{
    return this.http.get<gruposPagos|gruposPagos[]>(`${this.apiURL2}/${id_grupo}`);
  }
}
