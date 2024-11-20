import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environtment';
import { Observable } from 'rxjs';
import { categoria } from '../../interfaces/categorias.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http:HttpClient) { }
  private apiUrl = `${environment.apiUrl}/category`;

  getCategorias():Observable<categoria|categoria[]>{
    return this.http.get<categoria|categoria[]>(this.apiUrl);
  }

  getCategoriasActivas():Observable<categoria|categoria[]>{
    return this.http.get<categoria|categoria[]>(`${this.apiUrl}/activas`);
  }

  activarCategoria(categoryId: string):Observable<categoria|categoria[]>{
    return this.http.patch<categoria|categoria[]>(`${this.apiUrl}/activar/${categoryId}`,{});
  }

  desactivarCategoria(categoryId: string):Observable<categoria|categoria[]>{
    return this.http.patch<categoria|categoria[]>(`${this.apiUrl}/desactivar/${categoryId}`,{});
  }

  postCategoria(nombre: string, presupuesto: number):Observable<categoria|categoria[]>{
    return this.http.post<categoria|categoria[]>(`${this.apiUrl}`,{nombre, presupuesto});
  }
}
