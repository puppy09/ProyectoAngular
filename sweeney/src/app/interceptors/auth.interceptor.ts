import { HttpInterceptorFn, HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) =>{
    const token = localStorage.getItem('token');

    if(token){
      req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
      });
    }
    return next(req);
};
