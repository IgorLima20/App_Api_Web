import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.obterTokenUsuario;
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = environment.apiUrl.split('/');

    if (token && requestUrl[2] === apiUrl[2]) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(request).pipe(
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.userService.logout();
          }
          throw error;
        })
      );
    } else {
      return next.handle(request);
    }
  }

}
