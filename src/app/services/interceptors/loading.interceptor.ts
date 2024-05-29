import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { LoadingService } from '../loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  requests: HttpRequest<any>[] = [];

  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(request);
    this.loadingService.loadingEvent(this.isLoading());
    return next.handle(request).pipe(
      finalize(() => {
        this.finalizeRequest(request);
      })
    );
  }

  finalizeRequest(req: HttpRequest<any>) {
    const index = this.requests.indexOf(req);
    if (index !== -1) {
      this.requests.splice(index, 1);
    }
    this.loadingService.loadingEvent(this.isLoading());
  }

  isLoading(): boolean {
    return this.requests.length > 0;
  }

}
