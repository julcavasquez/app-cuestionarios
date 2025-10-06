import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
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
  private usuarioActual = new BehaviorSubject<any>(null);
  usuario$ = this.usuarioActual.asObservable();

  constructor(private http: HttpClient) {
    // Intentar cargar usuario desde localStorage al iniciar    
    const usuarioGuardado = localStorage.getItem('usuario');    
    if (usuarioGuardado) {
      this.usuarioActual.next(JSON.parse(usuarioGuardado));
      console.log(this.usuarioActual);
    }
  }

  // Simula login
  loginUsu(usuario:any) {
  localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioActual.next(usuario);
  }

  // Logout
  logout() {
    localStorage.removeItem('usuario');
    this.usuarioActual.next(null);
    console.log('Usuario deslogueado');
  }

  // Verifica si hay usuario logueado
  estaLogueado(): boolean {
    return !!this.usuarioActual.value;
  }

  // Verifica si es admin
  esAdmin(): boolean {
    return this.usuarioActual.value?.rol === 'admin';
  }

  // Verifica si es Estudiante
  esEstudiante(): boolean {
    return this.usuarioActual.value?.rol === 'estudiante';
  }


  // Actualiza datos del usuario
  // actualizarUsuario(datos: Partial<Usuario>) {
  //   const usuario = this.usuarioActual();
  //   if (usuario) {
  //     this.usuarioActual.set({ ...usuario, ...datos });
  //   }
  // }

   getUsuario() {    
     return this.usuarioActual.value;
  }

  getUsuarioId(): number | null {
    return this.getUsuario().value?.userId ?? null;
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

