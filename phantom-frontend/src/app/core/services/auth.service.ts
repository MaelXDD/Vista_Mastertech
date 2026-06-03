// src/app/core/services/auth.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly API = 'http://localhost:8089/api/auth';
  private readonly TOKEN_KEY = 'phantom_token';
  private readonly USER_KEY  = 'phantom_user';

  // Signal reactivo: el componente puede leerlo con authService.currentUser()
  private _currentUser = signal<LoginResponse | null>(this.loadUser());

  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoggedIn  = computed(() => this._currentUser() !== null);
  readonly isAdmin     = computed(() => this._currentUser()?.rol === 'ADMIN');

  constructor(private http: HttpClient) {}

  // ── Login ────────────────────────────────────────────────────────────────
  login(req: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/login`, req).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(res));
        this._currentUser.set(res);
      })
    );
  }

  // ── Registro ─────────────────────────────────────────────────────────────
  registro(req: RegisterRequest): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.API}/registro`, req);
  }

  // ── Logout ───────────────────────────────────────────────────────────────
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._currentUser.set(null);
  }

  // ── Token para el interceptor ─────────────────────────────────────────────
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // ── Carga usuario desde localStorage (persistencia entre recargas) ────────
  private loadUser(): LoginResponse | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
