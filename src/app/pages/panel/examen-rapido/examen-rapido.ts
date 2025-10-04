import { OnInit,Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray,FormBuilder, FormsModule,FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { TemasService } from '../../../services/temas';
import { PreguntasService } from '../../../services/preguntas';
@Component({
  selector: 'app-examen-rapido',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './examen-rapido.html',
  styleUrl: './examen-rapido.scss'
})
export class ExamenRapido implements OnInit{
  configForm!: FormGroup;
  listtemas: any[] = [];
  maxPreguntas = 15;
  examenIniciado: boolean = false;
  resumenSeleccion: any[] = [];
  preguntas: any[] = []; // simulamos las preguntas cargadas
  preguntaIndex = 0;
  letras = ['a','b','c','d','e','f','g','h']; 
   constructor(
    private fb: FormBuilder,
    private temasService: TemasService,
    private pregutasService : PreguntasService
  ) {
       
  }

   ngOnInit(): void {
      this.configForm = this.fb.group({
    temas: this.fb.array([])  // inicializado vacío
  });
    this.cargarTemas();
    console.log(this.listtemas);
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

  siguientePregunta() {
    if (this.preguntaIndex < this.preguntas.length - 1) {
      this.preguntaIndex++;
    }
  }

  anteriorPregunta() {
    if (this.preguntaIndex > 0) {
      this.preguntaIndex--;
    }
  }



}
