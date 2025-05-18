import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const headerInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  //ngrx-store-localstorage": "^13.0.1"
  const token = localStorage.getItem('jwtToken');
  console.log(req);
  const Authorization = localStorage.getItem('jwtToken') ? `Bearer ${localStorage.getItem('jwtToken')}` : '';
  if(!req.url.includes('login') && !req.url.includes('join') && token)
    return next(req.clone({ setHeaders: { Authorization } }));
  else
  return next(req);
};
