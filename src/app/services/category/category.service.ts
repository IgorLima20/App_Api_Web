import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryData } from 'src/app/interfaces/CategoryData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseApiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getData(): Observable<CategoryData[]> {
    return this.http.get<CategoryData[]>(`${this.baseApiUrl}/categoria`);
  }

}
