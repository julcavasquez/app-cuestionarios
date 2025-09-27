// guards/no-auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (usuarioService.estaLogueado()) {
    // Si es admin, lo mandamos al dashboard
    if (usuarioService.esAdmin()) {
      router.navigate(['/admin/dashboard']);
    } else {
      router.navigate(['/home']);
    }
    return false;
  }

  return true; // si no está logueado, sí puede entrar
};
