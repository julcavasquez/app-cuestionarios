import { Component,HostListener,signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
   menuOpen = signal(false);

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
}
