export interface Producto {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  marca?: string;
  categoriaId?: number;
  imagenUrl?: string;
  stock?: number;
}
