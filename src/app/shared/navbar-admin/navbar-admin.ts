import { Component, signal, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, UserRoundCog,FileQuestionMark,BookA} from 'lucide-angular';
import { UsuarioService } from '../../services/usuario';
import { Router } from '@angular/router';
import { RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-navbar-admin',
  imports: [CommonModule,LucideAngularModule,RouterLink, RouterLinkActive],
  templateUrl: './navbar-admin.html',
  styleUrl: './navbar-admin.scss'
})
export class NavbarAdmin {
private collapsed = signal(false);
readonly UserRoundCog  = UserRoundCog ;
readonly FileQuestionMark = FileQuestionMark ;
readonly BookA = BookA ;
  @Output() collapsedChange = new EventEmitter<boolean>();

  constructor(public usuarioService: UsuarioService,
      private router: Router) {
    this.checkScreenSize();
  }

  isCollapsed() {
    return this.collapsed();
  }

  toggle() {
    this.collapsed.set(!this.collapsed());
    this.collapsedChange.emit(this.collapsed());
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    // 👉 solo define el estado inicial, pero no bloquea el toggle
    if (window.innerWidth < 768) {
      this.collapsed.set(true);
    }
    this.collapsedChange.emit(this.collapsed());
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/home']);
  }
}
