// src/app/modules/modules/auth/auth.routes.ts
import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page')
        .then(m => m.LoginPageComponent)
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/register-page/register-page')
        .then(m => m.RegisterPageComponent)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
