import { Component,signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { NavbarAdmin } from '../shared/navbar-admin/navbar-admin';
import { Footer } from '../shared/footer/footer';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [NavbarAdmin,Footer,RouterOutlet,NgClass],
  template: `
       <div class="layout-container">
      <app-navbar-admin (collapsedChange)="onSidebarChange($event)"></app-navbar-admin>
      
      <div class="main-wrapper" [ngClass]="{'collapsed': sidebarCollapsed()}">
        <main class="content">
          <router-outlet></router-outlet>
        </main>
        <footer>
          <app-footer></app-footer>
        </footer>
      </div>
    </div>
  `,
  styles: [` .layout-container {
      display: flex;
      min-height: 100vh;
    }

    .main-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 250px;
      transition: margin-left 0.3s;
    }

    .main-wrapper.collapsed {
      margin-left: 60px;
    }

    .content {
      flex: 1;
      padding: 20px;
    }

    footer {
      background: #333;
      color: white;
      text-align: center;
      padding: 15px;
    }

    @media (max-width: 768px) {
      .main-wrapper {
        margin-left: 60px;
      }
    }`]
})
export class AdminLayout {
      sidebarCollapsed = signal(false);

  onSidebarChange(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }
}
