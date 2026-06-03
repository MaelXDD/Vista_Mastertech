// src/app/modules/modules/productos/pages/lista-productos/lista-productos.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule }              from '@angular/common';
import { FormsModule }               from '@angular/forms';
import { RouterLink }                from '@angular/router';
import { ProductoService }           from '../../../../../core/services/producto.service';
import { AuthService }               from '../../../../../core/services/auth.service';
import { Producto }                  from '../../../../../core/models/auth.models';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './lista-productos.component.html',
})
export class ListaProductosComponent implements OnInit {

  productos = signal<Producto[]>([]);
  loading   = signal(true);
  error     = signal<string | null>(null);
  busqueda  = '';

  readonly categorias = [
    { id: 1, nombre: 'Consolas' },
    { id: 2, nombre: 'Videojuegos' },
    { id: 3, nombre: 'Periféricos' },
    { id: 4, nombre: 'Tarjetas' },
    { id: 5, nombre: 'Sillas Gamer' },
  ];

  constructor(
    private productoService: ProductoService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarTodos();
  }

  cargarTodos() {
    this.loading.set(true);
    this.productoService.listar().subscribe({
      next: (data) => { this.productos.set(data); this.loading.set(false); },
      error: ()    => { this.error.set('No se pudo conectar al backend.'); this.loading.set(false); }
    });
  }

  filtrarCategoria(categoriaId: number) {
    this.loading.set(true);
    this.productoService.porCategoria(categoriaId).subscribe({
      next: (data) => { this.productos.set(data); this.loading.set(false); },
      error: ()    => { this.error.set('Error al filtrar.'); this.loading.set(false); }
    });
  }

  buscar() {
    if (!this.busqueda.trim()) { this.cargarTodos(); return; }
    this.loading.set(true);
    this.productoService.buscar(this.busqueda).subscribe({
      next: (data) => { this.productos.set(data); this.loading.set(false); },
      error: ()    => { this.error.set('Error en la búsqueda.'); this.loading.set(false); }
    });
  }

  logout() { this.authService.logout(); }
}
