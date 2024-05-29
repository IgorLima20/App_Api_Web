import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PrincipalComponent } from './pages/compartilhado/principal/principal.component';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { LoadingInterceptor } from './services/interceptors/loading.interceptor';
import { CategoriesComponent } from './pages/categories/categories.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategorieCadComponent } from './components/categorie-cad/categorie-cad.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PrincipalComponent,
    CategoriesComponent,
    CategorieCadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    NgbModule,
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  },
  { provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
