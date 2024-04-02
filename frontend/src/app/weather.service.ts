import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    return this.http.get(`http://localhost:3000/weather?city=${city}`);
  }
}
