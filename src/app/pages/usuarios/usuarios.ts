import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario';

export interface Usuario {
  id: number;
  nombres: string;
  email: string;
  rol: 'admin' | 'usuario';
  estado: boolean;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class Usuarios {
  usuarios: Usuario[] = [];
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
      console.log(data);
    });
  }
  
}





