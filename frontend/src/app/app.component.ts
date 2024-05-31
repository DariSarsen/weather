import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';


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
  imports: [NgFor, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NavbarComponent, FooterComponent],
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