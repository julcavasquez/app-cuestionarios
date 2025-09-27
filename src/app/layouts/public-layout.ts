import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';
import { Footer } from '../shared/footer/footer';
@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [Navbar, RouterOutlet,Footer],
  template: `
     <div class="layout-container">
      <header>
        <app-navbar></app-navbar>
      </header>

      <main class="content">
        <router-outlet></router-outlet>
      </main>

      <footer>
        <app-footer></app-footer>
      </footer>
    </div>
  `,
  styles: [`.layout-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
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
    }`]
})
export class PublicLayout {}