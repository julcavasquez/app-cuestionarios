import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from './usuario';

export const adminGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);
  
  if (usuarioService.estaLogueado() && usuarioService.esAdmin()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
