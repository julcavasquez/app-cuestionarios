import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuestionariosService } from '../../services/cuestionarios';
import { PreguntasService } from '../../services/preguntas';
import { RouterModule } from '@angular/router';
import { CuestionarioForm } from './cuestionario-form/cuestionario-form'; 

declare var bootstrap: any; // 👈 aquí declaras bootstrap

@Component({
  selector: 'app-cuestionarios',
  standalone: true,
  imports: [CommonModule,RouterModule,CuestionarioForm],
  templateUrl: './cuestionarios.html',
  styleUrl: './cuestionarios.scss'
})
export class Cuestionarios implements OnInit {
  cuestionarios: any[] = [];
  constructor(private cuestionariosService: CuestionariosService,
    private preguntasService: PreguntasService
  ) {}
 mostrarModal = false;
  ngOnInit() {
    this.preguntasService.getPreguntas().subscribe(data => {
      this.cuestionarios = data;
    });
  }

   onGuardado(event: any) {
    console.log('✅ Cuestionario guardado:', event);

    // Cerrar modal con Bootstrap API
    const modalEl = document.getElementById('cuestionarioModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.hide();
    }
  }

  cerrarModal() {
    const modalEl = document.getElementById('cuestionarioModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
  }
}
