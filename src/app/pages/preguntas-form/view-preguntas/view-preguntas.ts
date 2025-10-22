import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CuestionariosService } from '../../../services/cuestionarios';
import { PreguntasService } from '../../../services/preguntas';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-preguntas',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './view-preguntas.html',
  styleUrl: './view-preguntas.scss'
})
export class ViewPreguntas implements OnInit{
  opciones: any[] = [];
  pregunta: any = {};
  preguntaId!: number;
   letras = ['a','b','c','d','e','f','g','h']; 
  

  editando = false;
  nuevoEnunciado = '';
  ngOnInit(): void {
    this.preguntaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarPregunta();
  }
   constructor(
    private fb: FormBuilder,
     private route: ActivatedRoute,
    private cuestionariosService : CuestionariosService,
    private preguntasService : PreguntasService
  ) {}

  cargarPregunta() {
     this.cuestionariosService.getCuestionarioId(this.preguntaId).subscribe({
      next: (data) => {
        this.pregunta = data;
        console.log('✅ Cuestionario:', this.pregunta);
          this.cuestionariosService.getCuestionarioCompleto(this.preguntaId).subscribe({
              next: (data) => {
                this.opciones = data
                 console.log(data);
              },
              error: (err) => console.error(err)
            });
      },
      error: (err) => {
        console.error('❌ Error cargando cuestionario:', err);
      }
    });
   
  }

   editarPregunta() {
    this.nuevoEnunciado = this.pregunta.enunciado_pregunta;
    this.editando = true;
  }

  cancelarEdicion() {
    this.editando = false;
    this.nuevoEnunciado = '';
  }

  guardarCambios() {
    if (!this.nuevoEnunciado.trim()) return;
     Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción editara el enunciado de la pregunta',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, editar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        confirmButtonColor: 'rgba(18, 141, 7, 1)',
        cancelButtonColor: '#e41212ff'
      }).then((result) => {
        if (result.isConfirmed) {
            this.preguntasService.actualizarEnunciado(this.pregunta.id_pregunta, this.nuevoEnunciado).subscribe({
      next: () => {
        this.pregunta.enunciado_pregunta = this.nuevoEnunciado;
        this.editando = false;
        Swal.fire({
          icon: 'success',
          title: 'Pregunta actualizada',
          text: 'El enunciado fue modificado correctamente ✅',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar la pregunta.', 'error');
      }
    });
        }
      });
  
  }

   editarOpcion(o: any) {
    o.textoTemporal = o.texto_opcion;
    o.editando = true;
  }

  cancelarEdicionOpcion(o : any) {
    o.editando = false;
  }

  guardarOpcion(o: any) {
    if (!o.textoTemporal.trim()) return;
  Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción editara el enunciado de la opción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, editar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        confirmButtonColor: 'rgba(18, 141, 7, 1)',
        cancelButtonColor: '#e41212ff'
      }).then((result) => {
        if (result.isConfirmed) {
          this.preguntasService.actualizarOpcion(o.id_opcion, {
      texto_opcion: o.textoTemporal
    }).subscribe({
      next: () => {
        o.texto_opcion = o.textoTemporal;
        o.editando = false;
        Swal.fire({
          icon: 'success',
          title: 'Opción actualizada',
          text: 'Se guardaron los cambios correctamente ✅',
          timer: 1200,
          showConfirmButton: false
        });
        // Efecto visual de guardado
        o.guardado = true;
        setTimeout(() => (o.guardado = false), 3000); // Dura 1 segundo
      },
      error: () => Swal.fire('Error', 'No se pudo actualizar la opción.', 'error')
    });
        }
      });
    
  }

  
}
