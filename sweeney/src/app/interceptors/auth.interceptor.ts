import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
export const  authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> =>{
    const token = localStorage.getItem('authToken');
    
    if(token){
      console.log('intercepto');
      console.log(token);
      req = req.clone({
        setHeaders:{
          authorization: `Bearer ${token}`
        }
      });
    }
    return next(req);
};
