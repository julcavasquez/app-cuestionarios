import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario';
import { CommonModule } from '@angular/common'; // <- IMPORTANTE
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, CircleCheckBig,Clock3,Handshake } from 'lucide-angular';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,LucideAngularModule,RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  constructor(
  public usuarioService: UsuarioService,
  private router: Router) {}
readonly CircleCheckBig  = CircleCheckBig 
readonly Clock3  = Clock3 
readonly Handshake  = Handshake
  loginAdmin() {
    this.usuarioService.login({
      id: 1,
      nombres: 'Admin Ejemplo',
      email: 'admin@ejemplo.com',
      rol: 'admin',
      estado: true
    });

     this.router.navigate(['/admin/dashboard']);
  }

  logout() {
    this.usuarioService.logout();
  }
}
