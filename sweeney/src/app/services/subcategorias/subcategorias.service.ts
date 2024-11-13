import { Injectable } from '@angular/core';
import { subcategoria } from '../../interfaces/subcategorias.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environtment';
import { Observable } from 'rxjs';

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
}
