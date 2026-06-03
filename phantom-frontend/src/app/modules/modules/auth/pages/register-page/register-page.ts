// src/app/modules/modules/auth/pages/register-page/register-page.ts
import { Component, signal } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService }       from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register-page.html',
})
export class RegisterPageComponent {

  form = {
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    dni: '',
    direccion: '',
    numeroTelefono: ''
  };

  error   = signal<string | null>(null);
  success = signal(false);
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.error.set(null);
    this.loading.set(true);

    this.authService.registro(this.form).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        setTimeout(() => this.router.navigate(['/auth/login']), 2000);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.error ?? 'Error al registrarse. Intenta de nuevo.');
      }
    });
  }
}
