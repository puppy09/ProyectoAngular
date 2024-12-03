import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environtment';
import { HttpClient } from '@angular/common/http';
import { subcategoriaGrupal } from '../../interfaces/subcategoriasGrupos.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruposSubcategoriasService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}/subcategoriaGrupos`;

  getSubcategoriasCategoria(id_grupo:string, id_categoria:string):Observable<subcategoriaGrupal|subcategoriaGrupal[]>{
    return this.http.get<subcategoriaGrupal|subcategoriaGrupal[]>(`${this.apiUrl}/grupo/${id_grupo}/categoria/${id_categoria}`);
  }

  postSubcategoria(grupo:number,categoria:string, id_negocio:string):Observable<any>{
    return this.http.post(`${this.apiUrl}/${grupo}`, {categoria, id_negocio});
  }

  postAndAsignarNegocio(grupo:number,nombre:string, tipo_negocio:number,categoria:number):Observable<any>{
    return this.http.post(`${this.apiUrl}/post/and/asign`, {grupo,nombre, tipo_negocio,categoria});
  }

  getSubcategoriasByCategoria(grupo:number,categoria:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/grupo/${grupo}/categoria/${categoria}`);
  }

  deleteSubcategoria(grupo:number,categoria:number,marca:string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete`, {body:{categoria, marca, grupo}});
  }
}
