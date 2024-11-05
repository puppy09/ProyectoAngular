import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environtment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Cuenta {
  ID: number;
  no_cuenta: string;
  fecha_vencimiento: string;
  saldo: number;
  nombre: string;
  id_usuario: number;
  estatus: number;
  estatusDetail: {
    estatus: string;
  };
}
@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/cuentas`;

  getCuentas():Observable<Cuenta|Cuenta[]>{
    console.log(this.apiUrl);
    return this.http.get<Cuenta|Cuenta[]>(this.apiUrl);
  }
}
