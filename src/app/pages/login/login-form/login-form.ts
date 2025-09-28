import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {
    loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
    public usuarioService: UsuarioService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.usuarioService.login(this.loginForm.value).subscribe({
      next: (res) => {
        //this.mensaje = '✅ Usuario registrado correctamente';
        console.log(res);
        this.loginForm.reset();
        this.submitted = false;
        // 🚨 Mostrar alerta
        this.usuarioService.loginUsu(res);
        alert('✅ Login exitoso');
        if(res.rol == 'admin'){
            this.router.navigate(['/admin/dashboard']);
        }else{
          if(res.rol == 'estudiante'){
             this.router.navigate(['/estudiante/panel']);
          }
        }
        // 👉 Redirigir al home
        //this.router.navigate(['/home']);
      },
      error: (err) => {
        //this.mensaje = '❌ Error: ' + err.error?.message;
        console.log(err.error);
        alert('✅ Acceso Denegado: ' + err.error.message);
      }
    });
  }
}
