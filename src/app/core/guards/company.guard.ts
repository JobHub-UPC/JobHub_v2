import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const companyGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUser();

  if (user?.role === 'Company') {
    return true; // El usuario es un solicitante
  } else {
    // Opcional: redirigir a una página específica si no tiene el rol adecuado
    router.navigate(['/auth/login']);
    return false;
  }
};
