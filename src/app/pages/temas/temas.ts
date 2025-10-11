import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemasService } from '../../services/temas';
import { TemasForm } from './temas-form/temas-form';
import { NgxPaginationModule } from 'ngx-pagination';
declare var bootstrap: any; // 👈 aquí declaras bootstrap
@Component({
  selector: 'app-temas',
  standalone: true,
  imports: [CommonModule,TemasForm,NgxPaginationModule],
  templateUrl: './temas.html',
  styleUrl: './temas.scss'
})


export class Temas implements OnInit {
  temas: any[] = [];
page = 1; // 📌 Página inicial
  constructor(private temaService: TemasService) {}
   mostrarModal = false;
  ngOnInit() {
    this.temaService.getTemasCantidad().subscribe(data => {
      this.temas = data;
    });
  }

  onGuardado(event: any) {
    console.log('✅ Cuestionario guardado:', event);

    // Cerrar modal con Bootstrap API
    const modalEl = document.getElementById('temasModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.hide();
      this.temaService.getTemas().subscribe(data => {
      this.temas = data;
    });
    }
  }

   cerrarModal() {
    const modalEl = document.getElementById('temasModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
  }
}