import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  requests: HttpRequest<any>[] = [];

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(request);
    this.loadingService.loadingEvent(this.isLoading());
    return next.handle(request).pipe(
      finalize(() => {
        const index = this.requests.indexOf(request);
        if (index !== -1) {
          this.requests.splice(index, 1);
        }
        this.loadingService.loadingEvent(this.isLoading());
      })
    );
  }

  isLoading(): boolean {
    return this.requests.length > 0;
  }

}
