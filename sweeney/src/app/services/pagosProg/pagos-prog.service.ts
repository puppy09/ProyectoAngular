import { Injectable } from '@angular/core';
import { pagosProgramados } from '../../interfaces/pagosProgramados.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environtment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosProgService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/pagos/programados`;

  getGruposCreados(): Observable<pagosProgramados|pagosProgramados[]>{
    return this.http.get<pagosProgramados|pagosProgramados[]>(this.apiUrl);
  }
}
