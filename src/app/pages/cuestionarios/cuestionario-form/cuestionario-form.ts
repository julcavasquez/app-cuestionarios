import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TemasService } from '../../../services/temas';
import { UsuarioService } from '../../../services/usuario';
@Component({
  selector: 'app-cuestionario-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './cuestionario-form.html',
  styleUrl: './cuestionario-form.scss'
})
export class CuestionarioForm implements OnInit {
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<any>();

  cuestionarioForm!: FormGroup;
  temas: any[] = [];
  usuarios: any[] = [];

   constructor(
    private fb: FormBuilder,
    private temasService: TemasService,
    private usuarioService : UsuarioService
  ) {}

   ngOnInit(): void {
    this.cuestionarioForm = this.fb.group({
      titulo_cuestionario: ['', Validators.required],
      descripcion_cuestionario: ['', Validators.required],
      id_tema: ['', Validators.required]
    });

    this.cargarTemas();
    // this.cargarUsuarios();
  }

  cargarTemas() {
    this.temasService.getTemas().subscribe({
      next: (res) => (this.temas = res),
      error: (err) => console.error(err),
    });
  }

  onSubmit() {
    if (this.cuestionarioForm.valid) {
       const idUsuario = this.usuarioService.getUsuarioId();
       console.log(idUsuario);
    //    const payload = {
    //   ...this.cuestionarioForm.value,
    //   id_usu: idUsuario
    // };

    // this.cuestionarioService.guardarCuestionario(payload).subscribe({
    //   next: res => {
    //     console.log("✅ Cuestionario guardado", res);
    //   },
    //   error: err => console.error("❌ Error al guardar", err)
    // });
    //   this.cuestionarioService.crearCuestionario(this.cuestionarioForm.value).subscribe({
    //     next: (res) => {
    //       alert('✅ Cuestionario registrado con éxito');
    //       this.guardado.emit(res);
    //       this.cuestionarioForm.reset();
    //     },
    //     error: (err) => {
    //       console.error('❌ Error al guardar cuestionario:', err);
    //     },
    //   });
    // } else {
    //   alert('⚠️ Completa todos los campos');
    }
  }

   cancelar() {
    this.cuestionarioForm.reset({
       id_tema: ""
    }); // 🔹 Resetea formulario
    this.cerrar.emit(); // 🔹 Cierra modal
  }
}
