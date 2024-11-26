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
}
