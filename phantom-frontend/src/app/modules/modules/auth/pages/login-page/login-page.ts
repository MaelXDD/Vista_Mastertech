// src/app/modules/modules/auth/pages/login-page/login-page.ts
import { Component, signal } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService }       from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-page.html',
})
export class LoginPageComponent {

  email    = '';
  password = '';
  error    = signal<string | null>(null);
  loading  = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.error.set(null);
    this.loading.set(true);

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigate(['/productos']);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(
            err.error?.error ?? 'Error al iniciar sesión. Intenta de nuevo.'
          );
        }
      });
  }
}
