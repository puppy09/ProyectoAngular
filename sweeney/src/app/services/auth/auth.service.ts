import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environtment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { usuario } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = environment.apiUrl+'/auth';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any>{
    return this.http.post<any>(this.apiUrl+'/login', {email, contra: password}).pipe(
      tap(response => {
        if(response.token){
          console.log(response.token);
          this.setToken(response.token)
        }
      })
    )
  }

  register(nombre: string, apellidos: string,email: string): Observable<any>{
    return this.http.post<any>(this.apiUrl+'/register',{nombre, apellidos, email});
    catchError((error: HttpErrorResponse) =>{
      return throwError(()=> error);
    })
  }

  userInfo():Observable<usuario|usuario[]>{
    return this.http.get<usuario|usuario[]>(this.apiUrl);
  }
  private setToken(token: string): void{
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void{
    localStorage.removeItem(this.tokenKey);
  }
}
