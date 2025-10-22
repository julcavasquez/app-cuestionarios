import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TriviaService } from '../../../services/trivias';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
interface Opcion {
  id_opcion: number;
  texto_opcion: string;
  es_correcta: boolean;
}

interface Pregunta {
  id_pregunta: number;
  enunciado_pregunta: string;
  tipo_pregunta: 'OU' | 'OM';
  feedback_pregunta: string;
  opciones: Opcion[];
} 


@Component({
  selector: 'app-trivia-dia',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './trivia-dia.html',
  styleUrl: './trivia-dia.scss'
})
export class TriviaDia implements OnInit{
  preguntas: Pregunta = {
  id_pregunta: 0,
  enunciado_pregunta: '',
  tipo_pregunta: 'OU',
  feedback_pregunta: '',
  opciones: []
};
  cargando: boolean = true; // 👈 bandera de estado inicial
  mensaje: number = 0;
  letras = ['a','b','c','d','e','f','g','h']; 
  seleccionadas: number[] = [];
  verificado = false;
  constructor(
    private fb: FormBuilder,
    private triviaService : TriviaService,
    private router : Router
  ) {
       
  }


  opcionSeleccionada: any = null;
  mostrarResultado = false;
  esCorrecta = false;
  tiempoRestante = 30;
  temporizador: any;

  ngOnInit() {
    this.cargarTrivia();
    this.iniciarTemporizador();
    
  }

   ngOnDestroy() {
    this.detenerTimer();
  }


  detenerTimer() {
    if (this.temporizador) {
      clearInterval(this.temporizador);
    }
  }

  iniciarTemporizador() {
    this.temporizador = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        clearInterval(this.temporizador);
        Swal.fire({
                    title: '🚨 El Tiempo a concluido',
                    text: 'No pudiste responder la trivia, vuelve a intentarlo.',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3085d6'
                  }).then(() => {
                    this.router.navigate(['/estudiante/panel']);;
                     
                  });
        
      }
    }, 1000);
  }

   seleccionarOpcion(id_opcion: number, event: any) {
    const tipo = this.preguntas.tipo_pregunta;
    if (tipo === 'OU') {
      this.seleccionadas = [id_opcion];
    } else {
      if (event.target.checked) {
        this.seleccionadas.push(id_opcion);
      } else {
        this.seleccionadas = this.seleccionadas.filter(id => id !== id_opcion);
      }
    }
  }

  verificarRespuesta() {
    this.mostrarResultado = true;
    clearInterval(this.temporizador);
    const pregunta = this.preguntas;
    const correctas = pregunta.opciones
                    .filter(o => o.es_correcta)
                    .map(o => o.id_opcion);

    this.esCorrecta = this.compararArrays(correctas, this.seleccionadas);
    this.verificado = true;
  }

  compararArrays(arr1: number[], arr2: number[]): boolean {
    return arr1.length === arr2.length && arr1.every(a => arr2.includes(a));
  }

    cargarTrivia() {
    this.triviaService.getTriviaDelDia().subscribe({
      next: (res : any) => {
         this.cargando = false; // 👈 detener carga
         if (res.message) {
          console.log(res.message);
          this.mensaje = 1; 
          // 👈 Mostramos el mensaje
    } else {
      this.preguntas = res;
      this.mensaje = 0;
      this.cargando = false;
    }
             
        
      },
      error: (err) => console.error(err),
    });
  }
  
}
