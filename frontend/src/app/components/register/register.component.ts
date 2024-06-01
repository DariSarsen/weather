import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router) { }

  register( email: string, password: string): void {
    const user = { email, password };
    this.authService.register(user).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Успешная регистрация');
        this.authService.login(user);
        this.router.navigate(['/']);
      },
      error: (error) => {
        if (error && error.error && error.error.message) {
          this.toastr.error(error.error.message, 'Ошибка при регистрации');
        } else {
          this.toastr.error('Что-то пошло не так', 'Ошибка при регистрации');
        }
        console.error('Ошибка при регистрации:', error);
      }
    });
    
  }

}
