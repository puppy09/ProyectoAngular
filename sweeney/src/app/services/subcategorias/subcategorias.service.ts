import { Injectable } from '@angular/core';
import { subcategoria } from '../../interfaces/subcategorias.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environtment';
import { Observable } from 'rxjs';
import { asignarNegociosPayload } from '../../interfaces/asignarNegociosPayload.interface';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriasService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/subcategory`;

  getSubcategoriasByCat(catId:string):Observable<subcategoria|subcategoria[]>{
    const url2 = this.apiUrl+"/"+catId;
    console.log('hola catId');
    console.log(catId);
    return this.http.get<subcategoria|subcategoria[]>(url2);
  }

  postSubcategoria(catId: number, marca: number):Observable<subcategoria|subcategoria[]>{
      return this.http.post<subcategoria|subcategoria[]>(`${this.apiUrl}`,{categoria:catId, marca});
  }

  asignarNegocios(payload: asignarNegociosPayload): Observable<any>{
    return this.http.post(`${this.apiUrl}/crear/asociaciones`, payload);
  }

  regAsigNegocio(nombre:string, tipo_negocio:number, categoria:number):Observable<any>{
    console.log("SERVICIO");
    console.log(nombre);
    console.log(tipo_negocio);
    console.log(categoria);
    return this.http.post<any>(`${this.apiUrl}/create/assign`, {nombre, tipo_negocio, categoria});
  }

  deleteSubcategoria(categoria:number, marca:number):Observable<subcategoria>{
    console.log("SERVICIO");
    console.log(categoria);
    console.log(marca);
    return this.http.post<subcategoria>(`${this.apiUrl}/delete`,{categoria, marca});
  }
}
