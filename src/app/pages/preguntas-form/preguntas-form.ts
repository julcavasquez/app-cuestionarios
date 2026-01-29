import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
 competencias : any[] = [];
 subCompetencias : any[] = [];
 btnGuardarBD = false;
 detalle: any[] = [];
 detalleAgrupado: any[] = [];
constructor(private fb: FormBuilder,
  private route: ActivatedRoute,
  private temasService: TemasService,
  private router: Router,
private preguntasService : PreguntasService) {
    this.preguntaForm = this.fb.group({
      id_tema: [[null], Validators.required],
      competencia: [[null], Validators.required],
      subCompetencia: [{value:[null],disabled: true},Validators.required],
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
    this.cargarCompetencias();

      this.preguntaForm.get('competencia')?.valueChanges.subscribe((selected) => {
         console.log("Dato guardado:", selected);

    // selected.id → ID de la competencia
    // selected.nombre → Nombre de la competencia

      if (selected && selected.id) {
        this.cargarSubCompetencias(selected.id);
        this.preguntaForm.get('subCompetencia')?.setValue('');
         this.preguntaForm.get('subCompetencia')?.enable(); // ✅ habilitar dinámicamente
      } else {
        this.subCompetencias = [];
        this.preguntaForm.get('subCompetencia')?.setValue('');
         this.preguntaForm.get('subCompetencia')?.disable();
      }
    });

     this.preguntaForm.get('subCompetencia')?.valueChanges.subscribe((selected) => {
      if (selected && selected.id) {
        this.cargarTemas(selected.id);
        this.preguntaForm.get('id_tema')?.setValue('');
      } else {
        this.temas = [];
        this.preguntaForm.get('id_tema')?.setValue('');
       
      }
    });
  }

    cargarTemas(idSubCompetencia: number) {
    this.temasService.getTemasPorSubCompetencias(idSubCompetencia).subscribe({
      next: (res) => {
        this.temas = res;
        console.log(this.temas);
      },
      error: (err) => console.error(err),
    });
  }
  
    cargarSubCompetencias(idCompetencia: number){
      this.temasService.getSubCompetenciasPorCompetencia(idCompetencia).subscribe({
      next: (res) => {
        this.subCompetencias = res;
      },
      error: (err) => console.error(err)
    });
    }
    cargarCompetencias() {
    this.temasService.getAllCompetencias().subscribe({
      next: (res) => (this.competencias = res),
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
      console.log(this.preguntasGuardadas);
      console.log(this.temas);
      // reiniciar formulario
       // reiniciar pero con tipo en 1 por defecto
      this.preguntaForm.reset({
        enunciado: '',
        tipo: 'OU',   // 👈 valor fijo
        id_tema: '',
        competencia: '', 
        subCompetencia: '',  // 👈 valor fijo
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
    this.btnGuardarBD = true;
    this.preguntasService.guardarPreguntas(payload).subscribe({
      next: (res) => {
        alert('✅ Preguntas guardadas correctamente');
        this.router.navigate(['admin/cuestionarios']);
        this.btnGuardarBD = false;
      },
      error: (err) => {
        console.error('❌ Error al guardar preguntas', err);
      }
    });
  }

  getNombreCompe(id: number): string {
    console.log(this.competencias);
    console.log(id);
      if (!this.competencias || this.competencias.length === 0) return 'Cargando...';
      const competencia = this.competencias.find(t => Number(t.id_competencia) === Number(id));
      return competencia ? competencia.nom_competencia : 'No encontrado';
    }

    getNombreSubCompe(idComp: number,idSubComp: number): string {
      if (!this.subCompetencias || this.subCompetencias.length === 0) return 'Cargando...';
      const sub_competencia = this.subCompetencias.find(t => Number(t.id_sub_compe) === Number(idSubComp));
      return sub_competencia ? sub_competencia.descripcion_sub_compe : 'No encontrado';
    }

  
 
}
