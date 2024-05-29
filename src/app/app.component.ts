import { Component, Inject } from '@angular/core';
import { LoadingService } from './services/loading/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-apiangular';
  loading: Observable<boolean>;

  constructor(@Inject('URL_API') public urlApi: string,
               private loadingService: LoadingService) { 
    this.loading = this.loadingService.loadingObservable();
  }

}
