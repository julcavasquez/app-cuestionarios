import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CuestionariosService } from '../../../services/cuestionarios';
@Component({
  selector: 'app-view-preguntas',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './view-preguntas.html',
  styleUrl: './view-preguntas.scss'
})
export class ViewPreguntas implements OnInit{
  opciones: any[] = [];
  pregunta: any = {};
  preguntaId!: number;
   letras = ['a','b','c','d','e','f','g','h']; 
  ngOnInit(): void {
    this.preguntaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarPregunta();
  }
   constructor(
    private fb: FormBuilder,
     private route: ActivatedRoute,
    private cuestionariosService : CuestionariosService
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

  
}
