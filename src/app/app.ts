import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { NavbarAdmin } from './shared/navbar-admin/navbar-admin';
import { UsuarioService } from './services/usuario';
import { CommonModule } from '@angular/common';
import { Router,NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  constructor(private auth: UsuarioService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/' || event.url === '/home') {
          // 🔥 Siempre vuelve arriba en Home/Inicio
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  }

  
}