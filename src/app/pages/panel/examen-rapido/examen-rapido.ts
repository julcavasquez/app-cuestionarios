import { OnInit,Component, signal,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray,FormBuilder, FormsModule,FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { TemasService } from '../../../services/temas';
import { PreguntasService } from '../../../services/preguntas';
import { RouterLink, Router } from '@angular/router';
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
  selector: 'app-examen-rapido',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './examen-rapido.html',
  styleUrl: './examen-rapido.scss'
})
export class ExamenRapido implements OnInit, OnDestroy{
  configForm!: FormGroup;
  listtemas: any[] = [];
  maxPreguntas = 20;
  examenIniciado: boolean = false;
  resumenSeleccion: any[] = [];
  preguntas: Pregunta[] = []; // simulamos las preguntas cargadas
  preguntaIndex = 0;
  letras = ['a','b','c','d','e','f','g','h']; 
  preguntaActual = 0;
  seleccionadas: number[] = [];
  verificado = false;
  esCorrecto = false;
   // 🕒 Cronómetro
  segundos = 0;
  minutos = 0;
  minutosStr = '00';
  segundosStr = '00';
  timerInterval: any;
   constructor(
    private fb: FormBuilder,
    private temasService: TemasService,
    private pregutasService : PreguntasService,
    private router : Router
  ) {
       
  }

   ngOnInit(): void {
      this.configForm = this.fb.group({
    temas: this.fb.array([])  // inicializado vacío
  });
    this.cargarTemas();
    console.log(this.listtemas);
  }

   ngOnDestroy() {
    this.detenerTimer();
  }

  iniciarTimer() {
    this.timerInterval = setInterval(() => {
      this.segundos++;

      if (this.segundos >= 60) {
        this.minutos++;
        this.segundos = 0;
      }

      this.minutosStr = this.minutos < 10 ? '0' + this.minutos : this.minutos.toString();
      this.segundosStr = this.segundos < 10 ? '0' + this.segundos : this.segundos.toString();
    }, 1000);
  }

  detenerTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }



   cargarTemas() {
    this.temasService.getTemasCantidad().subscribe({
      next: (res) => {
        this.listtemas = res
         // 🔹 reconstruir el form con los temas recibidos
         console.log(res);
       // 🔹 Cada grupo contiene id, nombre, checkbox y slider
        const grupos = this.listtemas.map(t =>
          this.fb.group({
            id_tema: [t.id_tema],
            nom_tema: [t.nom_tema],
            max_preguntas : [t.total_preguntas],
            activo: [false],   // checkbox
            cantidad: [{ value: 0, disabled: true }]  // 🚀 inicia bloqueado
          })
        );

        this.configForm = this.fb.group({
          temas: this.fb.array(grupos)
        });
      },
      error: (err) => console.error(err),
    });
  }

    get temasArray(): FormArray {
    return this.configForm.get('temas') as FormArray;
  }
   

    empezarExamen() {
       if (this.totalSeleccionadas > 0) {
          this.examenIniciado = true;

          // 🚀 Obtenemos solo {id_tema, cantidad} de los seleccionados
          const seleccion = this.configForm.value.temas
            .filter((t: any) => t.activo && t.cantidad > 0)
            .map((t: any) => ({
              id_tema: t.id_tema,
              cantidad: t.cantidad
            }));

    console.log("Payload para backend:", seleccion);
            
          // Guardamos un resumen de lo seleccionado
        this.resumenSeleccion = this.temasArray.value
        .filter((v: any) => v.activo && v.cantidad > 0);
      // 🚀 Simulación de preguntas cargadas desde backend
        // Enviar al backend
      this.pregutasService.obtenerPreguntasPorConfig(seleccion).subscribe({
        next: (res) => {
          this.iniciarTimer();
          this.preguntas = res;
          console.log(res);
          this.preguntaIndex = 0;
        },
        error: (err) => {
          console.error('❌ Error cargando preguntas', err);
        }
      });
    }
    }

    toggleSlider(i: number) {
  const grupo = this.temasArray.at(i) as FormGroup;
  const activo = grupo.get('activo')?.value;

  if (activo) {
    grupo.get('cantidad')?.enable();   // habilita slider
  } else {
    grupo.get('cantidad')?.disable();  // deshabilita slider
    grupo.get('cantidad')?.setValue(0); // resetea a 0
  }
}


get totalSeleccionadas(): number {
  return this.temasArray.controls
    .map(grupo => grupo.get('cantidad')?.value || 0)
    .reduce((acc, val) => acc + val, 0);
}


onSliderChange(i: number) {
  if (this.totalSeleccionadas > this.maxPreguntas) {
    const grupo = this.temasArray.at(i) as FormGroup;
    const valorActual = grupo.get('cantidad')?.value || 0;

    // ajustamos el valor para que no se pase
    const exceso = this.totalSeleccionadas - this.maxPreguntas;
    grupo.get('cantidad')?.setValue(valorActual - exceso);
  }
} 

  // siguientePregunta() {
  //   if (this.preguntaIndex < this.preguntas.length - 1) {
  //     this.preguntaIndex++;
  //   }
  // }

  // anteriorPregunta() {
  //   if (this.preguntaIndex > 0) {
  //     this.preguntaIndex--;
  //   }
  // }

  seleccionarOpcion(id_opcion: number, event: any) {
    const tipo = this.preguntas[this.preguntaIndex].tipo_pregunta;
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
    const pregunta = this.preguntas[this.preguntaIndex];
    const correctas = pregunta.opciones
                    .filter(o => o.es_correcta)
                    .map(o => o.id_opcion);

    this.esCorrecto = this.compararArrays(correctas, this.seleccionadas);
    this.verificado = true;
  }

  siguientePregunta() {
    if (this.preguntaIndex < this.preguntas.length - 1) {
      this.preguntaIndex++;
      this.seleccionadas = [];
      this.verificado = false;
    } else {
      this.detenerTimer();
      Swal.fire({
                  title: '🎯 Examen finalizado',
                  text: 'Esta evaluación te ha tomado un tiempo de: ' + this.minutos + ":" + this.segundos,
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#3085d6'
                }).then(() => {
                  this.router.navigate(['/estudiante/panel']);
                });
   
    }
  }

  compararArrays(arr1: number[], arr2: number[]): boolean {
    return arr1.length === arr2.length && arr1.every(a => arr2.includes(a));
  }

  finalizarExamen() {
    const confirmar = confirm('¿Deseas finalizar el examen?');
    if (confirmar) {
      this.router.navigate(['/estudiante/panel']);
    }
  }



}
