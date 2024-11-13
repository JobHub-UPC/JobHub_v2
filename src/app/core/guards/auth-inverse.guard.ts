import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInverseGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const userRole = authService.getUserRole();
    if (userRole === 'Company') {
      router.navigate(['/home']);
    } else if (userRole === 'Applicant') {
      router.navigate(['/home']);
    }
    return false; // Bloquea el acceso a la ruta de autenticación
  }
  return true; // Permitir acceso a rutas de autenticación si no está autenticado
};
