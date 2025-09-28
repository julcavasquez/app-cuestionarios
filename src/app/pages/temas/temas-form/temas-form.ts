import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario';
import { TemasService } from '../../../services/temas';
@Component({
  selector: 'app-temas-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './temas-form.html',
  styleUrl: './temas-form.scss'
})
export class TemasForm implements OnInit {
    @Output() cerrar = new EventEmitter<void>();
    @Output() guardado = new EventEmitter<any>();

    temaForm!: FormGroup;

     constructor(
        private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private temasService : TemasService
      ) {}
    
    ngOnInit(): void {
    this.temaForm = this.fb.group({
      nombre_tema: ['', Validators.required],
      descripcion_tema: ['', Validators.required]
    });
  }

    onSubmit() {
    if (this.temaForm.valid) {
       const idUsuario = this.usuarioService.getUsuarioId();
       console.log(idUsuario);
       const payload = {
        ...this.temaForm.value,
      };

      console.log(payload);

    // this.cuestionarioService.guardarCuestionario(payload).subscribe({
    //   next: res => {
    //     console.log("✅ Cuestionario guardado", res);
    //   },
    //   error: err => console.error("❌ Error al guardar", err)
    // });
      this.temasService.registrarTema(payload).subscribe({
        next: (res) => {
          alert('✅ Tema registrado con éxito');
          this.guardado.emit(res);
          this.temaForm.reset();
        },
        error: (err) => {
           alert('❌ Error al guardar cuestionario: ' + err);
          console.error('❌ Error al guardar cuestionario:', err);
        },
      });
    } else {
      alert('⚠️ Completa todos los campos');
      
    }
  }

  cancelar() {
    this.temaForm.reset(); // 🔹 Resetea formulario
    this.cerrar.emit(); // 🔹 Cierra modal
  }

}
