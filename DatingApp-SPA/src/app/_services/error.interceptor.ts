import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorIntrerceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if( error.status === 401){
            return throwError(error.statusText);
          }
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            // console.error(applicationError);
            return throwError(applicationError);
          }
          const serverError = error.error;
          let modelStateErrors = '';
          console.log(serverError);
          if (serverError && typeof serverError === 'object') {
            for (const key in serverError) {
              if (serverError[key]) {
                // if (typeof serverError[key] === 'object') {
                //   for (const _key in serverError[key]) {
                //   console.log(serverError[key][_key]); 
                //   }
                // }
                modelStateErrors += serverError[key] + '\n';
              }
            }
          }
          return throwError(modelStateErrors || serverError || 'Server Error');
        }
      })
    );
  }
}

export const ErrorIntrerceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorIntrerceptor,
  multi: true
};
