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

  getCuentasInactivas():Observable<Cuentas|Cuentas[]>{
    return this.http.get<Cuentas|Cuentas[]>(`${this.apiUrl}/inactivas`);
  }

  activarCuenta(cuentaId: string):Observable<Cuentas>{
    return this.http.patch<Cuentas>(`${this.apiUrl}/activar/${cuentaId}`,{});
  }

  desactivarCuenta(cuentaId: string):Observable<Cuentas>{
    return this.http.patch<Cuentas>(`${this.apiUrl}/desactivar/${cuentaId}`,{});
  }

  postCuentas(no_cuenta: string, fecha_venci: string, nombre: string, saldo: number, estatus: number):Observable<Cuentas>{
    return this.http.post<Cuentas>(`${this.apiUrl}`,{no_cuenta, fecha_vencimiento: fecha_venci, nombre, saldo, estatus});
  }
  
  getSaldoTotal():Observable<JSON>{
    return this.http.get<JSON>(`${this.apiUrl}/sumatoria`);
  }

  updCuenta(cuentaId: number, fecha_vencimiento: string, nombre: string, saldo:number):Observable<Cuentas|Cuentas[]>{
    return this.http.put<Cuentas>(`${this.apiUrl}/${cuentaId}`,{fecha_vencimiento,nombre,saldo});
  }
}
