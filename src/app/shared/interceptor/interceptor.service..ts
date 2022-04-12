import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
/*    
    const token = sessionStorage.getItem('_TOKEN');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    const reqClone = req.clone({
      headers
    });

    return next.handle(reqClone).pipe(
      catchError(this.error)
    );
*/
  }

  error(error: HttpErrorResponse) {
    console.log('sucedió un error');
    console.error(error);
    return throwError('Error...')
  }

}

