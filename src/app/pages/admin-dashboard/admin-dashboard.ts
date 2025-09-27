import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario';
import { Router } from '@angular/router';
import { Usuarios } from '../usuarios/usuarios';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard {
    constructor(public usuarioService: UsuarioService,
      private router: Router
    ) {}

    logout() {
    this.usuarioService.logout();
    this.router.navigate(['/home']);
  }
}
