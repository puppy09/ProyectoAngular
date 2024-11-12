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
}
