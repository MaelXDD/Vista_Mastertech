// src/app/core/services/producto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class ProductoService {

  private readonly API = 'http://localhost:8089/api/productos';

  constructor(private http: HttpClient) {}

  /** Trae todos los productos */
  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API);
  }

  /** Un producto por ID */
  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.API}/${id}`);
  }

  /** Productos por categoría */
  porCategoria(categoriaId: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.API}/categoria/${categoriaId}`);
  }

  /** Búsqueda por término */
  buscar(term: string): Observable<Producto[]> {
    const params = new HttpParams().set('term', term);
    return this.http.get<Producto[]>(`${this.API}/buscar`, { params });
  }
}
