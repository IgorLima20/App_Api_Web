import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  loadingEvent(event: boolean) {
    this.loadingSubject.next(event);
  }

  loadingObservable(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

}
