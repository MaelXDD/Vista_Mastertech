import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  // Arreglo donde se guardarán los productos traídos de la base de datos
  listaProductos: Producto[] = [];
  mensajeError: string = '';

  // Inyección del servicio a través del constructor
  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.listarTodos().subscribe({
      next: (data) => {
        this.listaProductos = data;
        console.log('Datos recibidos correctamente del backend:', this.listaProductos);
      },
      error: (err) => {
        this.mensajeError = 'No se pudo conectar con el servidor backend.';
        console.error('Error de conexión:', err);
      },
    });
  }
}
