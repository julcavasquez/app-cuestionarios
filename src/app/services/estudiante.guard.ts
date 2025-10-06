import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from './usuario';

export const estudainteGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);
  console.log(usuarioService.estaLogueado());
  console.log(usuarioService.esEstudiante());
  if (usuarioService.estaLogueado() && usuarioService.esEstudiante()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
