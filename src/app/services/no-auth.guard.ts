// guards/no-auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);
 console.log(usuarioService.estaLogueado());
  if (usuarioService.estaLogueado()) {
    // Si es admin, lo mandamos al dashboard
    if (usuarioService.esAdmin()) {
      router.navigate(['/admin/dashboard']);
    } else {
      if(usuarioService.esEstudiante()){
           router.navigate(['/estudiante/panel']);
      }else{
        router.navigate(['/home']);
      }
    }
    return false;
  }

  return true; // si no está logueado, sí puede entrar
};
