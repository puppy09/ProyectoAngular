import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environtment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/cuentas`;

  getCuentas():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
}
