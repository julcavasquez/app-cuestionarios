import { Component,HostListener,signal,OnInit  } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit{
   usuario: any = null;
   constructor(public usuarioService: UsuarioService,
    private router: Router
    ) {}
   menuOpen = signal(false);

    ngOnInit(): void {
    this.usuario = this.usuarioService.getUsuario();
  }
  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  // 👇 Al cambiar el tamaño de la ventana
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768 && this.menuOpen()) {
      this.menuOpen.set(false); // cierra el menú si vuelve a escritorio
    }
  }

  logout(){
    this.usuarioService.logout();
    this.router.navigate(['/admin/dashboard']);
  }
}
