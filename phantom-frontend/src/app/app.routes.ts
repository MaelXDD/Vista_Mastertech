import { Routes } from '@angular/router';
import { authGuard } from '../app/core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },

  // Auth: login y registro
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/modules/modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  // Productos (público)
  {
    path: 'productos',
    loadComponent: () =>
      import('../app/modules/modules/productos/pages/lista-productos/lista-productos.component')
        .then(m => m.ListaProductosComponent)
  },

  // Wildcard
  { path: '**', redirectTo: 'productos' }
];
