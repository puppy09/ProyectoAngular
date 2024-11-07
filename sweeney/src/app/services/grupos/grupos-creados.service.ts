import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environtment';
import { HttpClient } from '@angular/common/http';
import { gruposCreados } from '../../interfaces/gruposCreados.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruposCreadosService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/grupos/creados`;

  getGruposCreados(): Observable<gruposCreados|gruposCreados[]>{
    return this.http.get<gruposCreados|gruposCreados[]>(this.apiUrl);
  }
}
