import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environtment';
import { HttpClient } from '@angular/common/http';
import { gruposCreados, gruposMiembro } from '../../interfaces/gruposCreados.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruposCreadosService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/grupos`;

  getGruposCreados(): Observable<gruposCreados|gruposCreados[]>{
    return this.http.get<gruposCreados|gruposCreados[]>(`${this.apiUrl}/creados`);
  }

  getGruposMiembro(): Observable<gruposMiembro|gruposMiembro[]>{
    return this.http.get<gruposMiembro|gruposMiembro[]>(`${this.apiUrl}/miembro`);
  }

  joinGrupo(token:string):Observable<JSON>{
    return this.http.post<JSON>(`${this.apiUrl}/miembro`,{token});
  }
}
