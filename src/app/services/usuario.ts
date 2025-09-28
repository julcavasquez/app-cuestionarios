import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
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
  private apiUrl = environment.apiUrl+'/usuarios';

  // Signal que mantiene el usuario actual
  usuarioActual : any = null;

  constructor(private http: HttpClient) {
    // Intentar cargar usuario desde localStorage al iniciar    
    const usuarioGuardado = localStorage.getItem('usuario');    
    if (usuarioGuardado) {
      this.usuarioActual = JSON.parse(usuarioGuardado);
      console.log(this.usuarioActual);
    }
  }

  // Simula login
  loginUsu(usuario:any) {
  this.usuarioActual = usuario;
  localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  // Logout
  logout() {
    this.usuarioActual = null;
    localStorage.removeItem('usuario');
    console.log('Usuario deslogueado');
  }

  // Verifica si hay usuario logueado
  estaLogueado(): boolean {
    return this.getUsuario() !== null;
  }

  // Verifica si es admin
  esAdmin(): boolean {
    return this.getUsuario()?.rol === 'admin';
  }

  // Verifica si es Estudiante
  esEstudiante(): boolean {
    return this.getUsuario()?.rol === 'estudiante';
  }


  // Actualiza datos del usuario
  // actualizarUsuario(datos: Partial<Usuario>) {
  //   const usuario = this.usuarioActual();
  //   if (usuario) {
  //     this.usuarioActual.set({ ...usuario, ...datos });
  //   }
  // }

   getUsuario() {    
    console.log('hola getUsuario'+this.usuarioActual)
    if (!this.usuarioActual) {
      const data = localStorage.getItem('usuario');
      this.usuarioActual = data ? JSON.parse(data) : null;
    }
    return this.usuarioActual;
  }

  getUsuarioId(): number | null {
    return this.getUsuario()?.userId ?? null;
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

