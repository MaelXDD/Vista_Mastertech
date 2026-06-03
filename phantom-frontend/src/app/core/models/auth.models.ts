// src/app/core/models/auth.models.ts

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
  confirmPassword: string;
  dni?: string;
  direccion?: string;
  numeroTelefono?: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  nombre: string;
  rol: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  marca: string;
  categoriaId: number;
  imagenUrl: string;
  stock: number;
}
