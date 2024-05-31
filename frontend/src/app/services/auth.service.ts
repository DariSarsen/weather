import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  user: any | null = null;

  constructor(private http: HttpClient) { 
    const userData = localStorage.getItem('user');
    console.log('userData:', userData);
    // localStorage.removeItem('user');
    if (userData !== null) {
      this.user = JSON.parse(userData);
      console.log(this.user);
    }
  }
  
  isLoggedIn(): boolean {
    return !!this.user;
  }
  
  logout(): void {
    this.user = null;
    console.log("this user: ", this.user)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
        this.user = response.user;
        localStorage.setItem('token', response.token);
        localStorage.setItem('tokenExpiration', response.expirationTime);
        localStorage.setItem('user', JSON.stringify(response.user));
      }),
      catchError(error => {
        throw error;
      })
    );
  }


}
