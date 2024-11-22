import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environtment';
import { Observable } from 'rxjs';
import { negocio } from '../../interfaces/negocio.interface';
import { negocioRubro } from '../../interfaces/negocioRubro.interface';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/negocios`;

  getRubros():Observable
}
