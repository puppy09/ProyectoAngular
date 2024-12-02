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
  postCategoriaGrupal(id_grupo:string, nombre:string, presupuesto:number):Observable<categoriaGrupal>{
    console.log("Categoria Grupal");
    console.log(id_grupo);
    console.log(nombre);
    console.log(presupuesto);
    return this.http.post<categoriaGrupal>(`${this.apiUrl}/${id_grupo}`, {nombre, presupuesto});
  }

  editCategoriaGrupal(id_categoria:string, grupo:number, nombre:string, presupuesto:number):Observable<categoriaGrupal>{
    return this.http.put<categoriaGrupal>(`${this.apiUrl}/${id_categoria}`, {grupo, nombre, presupuesto});
  }
}
