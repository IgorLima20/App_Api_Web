import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
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

  create(category: CategoryData): Observable<CategoryData> {
    return this.http.post<CategoryData>(`${this.baseApiUrl}/categoria`, category);
  }

  edit(category: CategoryData): Observable<any> {
    return this.http.put<any>(`${this.baseApiUrl}/categoria/${category.id}`, category);
  } 

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/categoria/${id}`);
  }

}
