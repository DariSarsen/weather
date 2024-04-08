import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface Weather {
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  description: string;
  windSpeed: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class AppComponent {
  city = '';
  weather: Weather | null = null;


  constructor(private weatherService: WeatherService) { }

  getWeather(): void {
    this.weatherService.getWeatherByCityName(this.city).subscribe({
      next: (data) => {
        this.weather = data.getWeatherByCityName;
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.weather = null;
      }
    });
  }
}