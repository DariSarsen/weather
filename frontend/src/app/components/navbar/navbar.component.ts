import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn$: Observable<boolean>;
  username: any = '' || null;

  constructor(private authService: AuthService, private router: Router) {this.isLoggedIn$ = this.authService.isLoggedIn();}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.username = sessionStorage.getItem('userEmail');
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
