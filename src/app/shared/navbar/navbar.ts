import { Component,HostListener,signal,OnInit,OnDestroy   } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit, OnDestroy{
   usuario: any = null;
    private sub!: Subscription;
   constructor(public usuarioService: UsuarioService,
    private router: Router
    ) {}
   menuOpen = signal(false);

    ngOnInit(): void {
     this.sub = this.usuarioService.usuario$.subscribe(user => {
      this.usuario = user;
    });
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
     Swal.fire({
    title: '👋 Sesión cerrada',
    text: 'Tu sesión se ha cerrado correctamente.',
    icon: 'success',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#3085d6'
  }).then(() => {
    this.router.navigate(['/']);
  });
  }

   ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
