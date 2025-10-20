import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.error?.Message) {
          this.toastr.error(error.error.Message, 'Error');
        }
        else if (error.status === 0) {
          this.toastr.error('No se pudo conectar con el servidor', 'Error de red');
        }
        else if (error.status >= 500) {
          this.toastr.error('Ocurrió un error en el servidor', 'Error 500');
        }
        else {
          this.toastr.error(error.error?.message || 'Error inesperado', `Error ${error.status}`);
        }

        return throwError(() => error);
      })
    );
  }
}
