import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environtment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cuentas } from '../../interfaces/cuentas.interface';


@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/cuentas`;

  getCuentas():Observable<Cuentas|Cuentas[]>{
    console.log(this.apiUrl);
    return this.http.get<Cuentas|Cuentas[]>(this.apiUrl);
  }

  getCuentasActivas():Observable<Cuentas|Cuentas[]>{
    return this.http.get<Cuentas|Cuentas[]>(`${this.apiUrl}/activas`);
  }
}
