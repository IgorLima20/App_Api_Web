import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/compartilhado/principal/principal.component';
import { HomeComponent } from './pages/home/home.component';
import { UserNotAuthenticatedGuard } from './services/guards/user-not-authenticated.guard';
import { UserAuthenticatedGuard } from './services/guards/user-authenticated.guard';
import { CategoriesComponent } from './pages/categories/categories.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [UserNotAuthenticatedGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [UserNotAuthenticatedGuard]},
  {
    path: '', component: PrincipalComponent, canActivate: [UserAuthenticatedGuard],
    children: [
      {path: '', component: HomeComponent},
      {path: 'categories', component: CategoriesComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
