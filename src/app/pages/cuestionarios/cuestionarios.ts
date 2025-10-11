import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuestionariosService } from '../../services/cuestionarios';
import { PreguntasService } from '../../services/preguntas';
import { RouterModule,Router } from '@angular/router';
import { CuestionarioForm } from './cuestionario-form/cuestionario-form'; 
import Swal from 'sweetalert2';
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
    private router: Router,
    private preguntasService: PreguntasService
  ) {}
 mostrarModal = false;
  ngOnInit() {
    this.cargarPreguntas();
  }

    cargarPreguntas(){
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

  eliminar(id: number) {
     Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción marcará la pregunta como eliminada',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6'
  }).then((result) => {
    if (result.isConfirmed) {
      this.preguntasService.eliminarPregunta(id).subscribe({
        next: (res) => {
          Swal.fire({
            title: '¡Eliminada!',
            text: res.message || 'La pregunta fue eliminada correctamente.',
            icon: 'success',
            confirmButtonColor: '#3085d6'
          });
          //this.router.navigate(['/admin/cuestionarios']);
          // Recargar o actualizar lista
          this.cargarPreguntas();
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar la pregunta. Intenta nuevamente.',
            icon: 'error',
            confirmButtonColor: '#3085d6'
          });
          console.error(err);
        }
      });
    }
  });
}
}
