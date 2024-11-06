import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environtment';
import { Observable } from 'rxjs';

interface Movimiento{
  id_movimiento: string;
  id_usuario: string;
  id_pago: string;
  no_cuenta: string;
  descripcion: string;
  tipo_movimiento: string;
  monto: number;
  fecha: Date;
  movimientoDetail:{
    tipo_movimiento: string;
  }
}
@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/movimientos`;

  getMovimientos():Observable<Movimiento|Movimiento[]>{
    console.log(this.apiUrl);
    return this.http.get<Movimiento|Movimiento[]>(this.apiUrl);
  }

}
