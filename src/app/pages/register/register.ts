import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  mensaje = '';
  constructor(private fb: FormBuilder,
    public usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      rol:'estudiante'
    });
  }

   get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.usuarioService.registrarUsuarios(this.registerForm.value).subscribe({
      next: (res) => {
        this.mensaje = '✅ Usuario registrado correctamente';
        console.log(res);
        this.registerForm.reset({
          rol: "estudiante"
        });
        this.submitted = false;
        // 🚨 Mostrar alerta
        alert('Usuario registrado correctamente ✅');

        // 👉 Redirigir al home
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.mensaje = '❌ Error: ' + err.error?.message;
        console.error(err);
      }
    });
  }

    loginAdmin() {
    this.usuarioService.login({
      id: 1,
      nombres: 'Admin Ejemplo',
      email: 'admin@ejemplo.com',
      rol: 'admin',
      estado: true
    });

     this.router.navigate(['/admin/dashboard']);
  }

}
