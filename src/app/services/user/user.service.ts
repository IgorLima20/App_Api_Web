import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/interfaces/User';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseApiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User): Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.baseApiUrl}/user/login`, user, { headers, observe: 'response' }).pipe(
      tap((response) => {
        if (response.status === 200) {
          localStorage.setItem('token', btoa(JSON.stringify(response.body['token'])));
          this.router.navigate(['']);
        }
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get obterTokenUsuario(): string {
    return localStorage.getItem('token')
      ? JSON.parse(atob(localStorage.getItem('token')!))
      : null;
  }
  
  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

}
