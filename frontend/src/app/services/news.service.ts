import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:3000/news'; 

  constructor(private http: HttpClient, private router: Router) { }

  getNews(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addNews(news: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, news).pipe(
    );
  }

  getNewsById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
    );
  }  

  updateNews(id: string, news: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<any>(url, news).pipe(
    );
  }

  deleteNews(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
    );
  }
}
