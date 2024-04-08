import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface WeatherResponse {
  getWeatherByCityName: {
    city: string;
    country: string;
    temperature: number;
    humidity: number;
    description: string;
    windSpeed: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private apollo: Apollo) {}

  getWeatherByCityName(city: string): Observable<WeatherResponse> {
    return this.apollo.watchQuery<WeatherResponse>({
      query: gql`
        query GetWeatherByCityName($city: String!) {
          getWeatherByCityName(city: $city) {
            city
            country
            temperature
            humidity
            description
            windSpeed
          }
        }
      `,
      variables: {
        city
      }
    }).valueChanges.pipe(
      map(result => result.data)
    );
  }
}
