import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environtment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = environment.apiUrl+'/profile';
  constructor(private http: HttpClient) { }

  cambiarPsw(contra: string, newcontra: string, confirContra: string): Observable<any>{
    return this.http.put<any>(this.apiUrl+'/cambiarPsw', {contra, newcontra, confirContra});   
  }
}
