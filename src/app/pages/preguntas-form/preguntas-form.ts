import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CuestionariosService } from '../../services/cuestionarios';
import { PreguntasService } from '../../services/preguntas';
import { TemasService } from '../../services/temas';
@Component({
  selector: 'app-preguntas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './preguntas-form.html',
  styleUrls: ['./preguntas-form.scss']
})
export class PreguntasForm implements OnInit{
cuestionario : any = {};
cuestionariCompleto : any = {};
cuestionarioId!: number;
 letras = ['a','b','c','d','e','f','g','h']; 
 temas: any[] = [];
constructor(private fb: FormBuilder,
  private route: ActivatedRoute,
  private cuestionarioService: CuestionariosService,
  private temasService: TemasService,
private preguntasService : PreguntasService) {
    this.preguntaForm = this.fb.group({
      id_tema: ['', Validators.required],
      enunciado: ['', Validators.required],
      tipo: ['OU', Validators.required],
      feedback: [''],
      opciones: this.fb.array([]) // Opciones dinámicas
    });
  }
  ngOnInit() {
    // this.cuestionarioId = Number(this.route.snapshot.paramMap.get('id'));
    // console.log('📌 ID recibido:', this.cuestionarioId);

    // // Aquí puedes hacer una petición al backend:
    // // Llamada al backend
    // this.cuestionarioService.getCuestionarioId(this.cuestionarioId).subscribe({
    //   next: (data) => {
    //     this.cuestionario = data;
    //     console.log('✅ Cuestionario:', this.cuestionario);
    //      this.cuestionarioService.getCuestionarioCompleto(this.cuestionarioId).subscribe({
    //           next: (data) => {
    //             this.cuestionariCompleto = data
    //              console.log('✅ Cuestionario:', this.cuestionariCompleto);
    //           },
    //           error: (err) => console.error(err)
    //         });
    //   },
    //   error: (err) => {
    //     console.error('❌ Error cargando cuestionario:', err);
    //   }
    // });
    this.cargarTemas();
  }

    cargarTemas() {
    this.temasService.getTemas().subscribe({
      next: (res) => (this.temas = res),
      error: (err) => console.error(err),
    });
  }

  preguntaForm: FormGroup;
  preguntasGuardadas: any[] = []; // 👉 aquí se almacenan las preguntas
  tipos = [
    { value: 'OU', label: 'Opción Única' },
    { value: 'OM', label: 'Opción Múltiple' },
    // { value: 'abierta', label: 'Abierta' }
  ];

 

  // Getter para el form array
  get opciones(): FormArray {
    return this.preguntaForm.get('opciones') as FormArray;
  }

  // Agregar nueva opción
  addOpcion() {
    this.opciones.push(
      this.fb.group({
        texto: ['', Validators.required],
        es_correcta: [false]
      })
    );
  }

  // Eliminar opción
  removeOpcion(i: number) {
    this.opciones.removeAt(i);
  }

  // Enviar formulario
  onSubmit() {
    if (this.preguntaForm.valid) {
      console.log('📌 Pregunta creada:', this.preguntaForm.value);
      // Aquí harías: this.miServicio.crearPregunta(this.preguntaForm.value).subscribe(...)
    } else {
      this.preguntaForm.markAllAsTouched();
    }
  }

   guardarPregunta() {
    if (this.preguntaForm.valid) {
      // agregar al arreglo
      this.preguntasGuardadas.push(this.preguntaForm.value);
      // reiniciar formulario
       // reiniciar pero con tipo en 1 por defecto
      this.preguntaForm.reset({
        enunciado: '',
        tipo: 'OU',   // 👈 valor fijo
        id_tema: '',   // 👈 valor fijo
        feedback:'',
        opciones: []
      });
      this.opciones.clear();
    }
  }

  eliminarPregunta(index: number) {
    this.preguntasGuardadas.splice(index, 1);
  }

   guardarPreguntasBD() {
    if (this.preguntasGuardadas.length === 0) {
      alert('No hay preguntas para guardar 🚨');
      return;
    }

    const payload = {
      preguntas: this.preguntasGuardadas
    };

    console.log(payload);

    this.preguntasService.guardarPreguntas(payload).subscribe({
      next: (res) => {
        alert('✅ Preguntas guardadas correctamente');
        console.log(res);
      },
      error: (err) => {
        console.error('❌ Error al guardar preguntas', err);
      }
    });
  }

  getNombreTema(id: number): string {
    console.log(id);
    return this.temas.find(t => t.id_tema === Number(id))?.nom_tema || 'No encontrado';
  }
}
