import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Usuario {
  id: number;
  nombres: string;
  email: string;
  rol: 'admin' | 'profesor' | 'estudiante';
  estado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://api-cuestionarios-production.up.railway.app/api/usuarios';

  // Signal que mantiene el usuario actual
  usuarioActual = signal<Usuario | null>(null);

  constructor(private http: HttpClient) {
    // Intentar cargar usuario desde localStorage al iniciar    
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuarioActual.set(JSON.parse(usuarioGuardado));
    }
  }

  // Simula login
  loginUsu(usuario:any) {
  this.usuarioActual.set(usuario);
  localStorage.setItem('usuario', JSON.stringify(usuario));
  console.log('Usuario logueado:', usuario);
  console.log(this.usuarioActual()?.rol);
  }

  // Logout
  logout() {
    this.usuarioActual.set(null);
    localStorage.removeItem('usuario');
    console.log('Usuario deslogueado');
  }

  // Verifica si hay usuario logueado
  estaLogueado(): boolean {
    return this.usuarioActual() !== null;
  }

  // Verifica si es admin
  esAdmin(): boolean {
    return this.usuarioActual()?.rol === 'admin';
  }

  // Actualiza datos del usuario
  actualizarUsuario(datos: Partial<Usuario>) {
    const usuario = this.usuarioActual();
    if (usuario) {
      this.usuarioActual.set({ ...usuario, ...datos });
    }
  }

   getUsuario() {
    if (!this.usuarioActual) {
      const data = localStorage.getItem('usuario');
      this.usuarioActual = data ? JSON.parse(data) : null;
    }
    return this.usuarioActual;
  }

  getUsuarioId(): number | null {
    return this.usuarioActual()?.id ?? null;
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  registrarUsuarios(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

 
}

