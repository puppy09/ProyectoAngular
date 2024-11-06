import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../../services/loading/loading.service';

export const loadingInterceptor:HttpInterceptorFn = (req, next) => {
  console.log('Cargando');
  const loadingSrv = inject(LoadingService);
  loadingSrv.show();
  return next(req).pipe(
    finalize(() => loadingSrv.hide())
  );
};
