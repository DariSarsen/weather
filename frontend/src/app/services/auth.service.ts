import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) { 
  }
  
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userEmail');
    window.location.reload();
  }

  hasToken(): boolean {
    return !!sessionStorage.getItem('token');
  }

  register(user: any): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, user).pipe(
      tap((response: any) => {
      }),
      catchError(error => {
        console.error('Error registering:', error);
        throw error;
      })
    );
  }

  login(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('tokenExpiration', response.expirationTime);
        localStorage.setItem('user', JSON.stringify(response.user));
        window.location.reload();
      }),
      catchError(error => {
        throw error;
      })
    );
  }


}
