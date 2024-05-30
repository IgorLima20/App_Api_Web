import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { CategoryData } from 'src/app/interfaces/CategoryData';
import { environment } from 'src/environments/environment';
import { PageAll } from 'src/app/interfaces/PageAll';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseApiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getData(): Observable<CategoryData[]> {
    return this.http.get<CategoryData[]>(`${this.baseApiUrl}/categoria`);
  }

  getDataPage(page: number, size: number): Observable<PageAll<CategoryData>> {
    return this.http.get<PageAll<CategoryData>>(`${this.baseApiUrl}/categoria/page?page=${page - 1}&size=${size}`);
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
