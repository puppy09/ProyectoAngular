import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoriaGrupal } from '../../interfaces/gastosGrupales.interface';
import { environment } from '../../../environments/environtment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GruposCategoriasService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/categoriasGrupos`;

  getCategoriaGrupal(id_grupo:string):Observable<categoriaGrupal|categoriaGrupal[]>{
    return this.http.get<categoriaGrupal|categoriaGrupal[]>(`${this.apiUrl}/${id_grupo}`);
  }

  getCategoriaGrupalActiva(id_grupo:string):Observable<categoriaGrupal|categoriaGrupal[]>{
    return this.http.get<categoriaGrupal|categoriaGrupal[]>(`${this.apiUrl}/activas/${id_grupo}`);
  }

  getCategoriaGrupalInactiva(id_grupo:string):Observable<categoriaGrupal|categoriaGrupal[]>{
    return this.http.get<categoriaGrupal|categoriaGrupal[]>(`${this.apiUrl}/inactivas/${id_grupo}`);
  }
}
