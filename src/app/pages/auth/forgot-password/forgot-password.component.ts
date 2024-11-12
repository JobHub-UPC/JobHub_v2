import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PasswordRecoveryService } from '../../../core/services/passwordRecovery.service';
import { PasswordRecoveryRequest } from '../../../shared/models/password-recovery-request.model';
import { TokenValidationResponse } from '../../../shared/models/token-validation-response.model';
import { PasswordResetRequest } from '../../../shared/models/password-reset-request.model';
import { PasswordResetResponse } from '../../../shared/models/password-reset-response.model';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {  step: number = 1; // 1: Solicitar correo, 2: Validar token, 3: Cambiar contraseña
  email: string = '';
  token: string = '';
  newPassword: string = '';
  isValidToken: boolean = false;

  constructor(private recoveryService: PasswordRecoveryService) {}

  ngOnInit() {}

  // Paso 1: Enviar el correo de recuperación
  sendRecoveryEmail() {
    this.recoveryService.sendPasswordRecoveryRequest(this.email).subscribe({
        next: () => {
            alert('Se envió el correo de recuperación');
            this.step = 2; // Ir al siguiente paso para validar el token
        },
        error: (error) => alert('Error al enviar el correo de recuperación: ' + error.message)
    });
}


  // Paso 2: Verificar el token
  validateToken() {
    this.recoveryService.validateToken(this.token).subscribe({
      next: (response: TokenValidationResponse) => {
        this.isValidToken = response.isValid;
        if (this.isValidToken) {
          this.step = 3; // Cambiamos al paso de cambio de contraseña
        } else {
          alert('Token inválido o expirado');
        }
      },
      error: () => alert('Error al verificar el token')
    });
  }

  // Paso 3: Cambiar la contraseña
  resetPassword() {
    this.recoveryService.resetPassword(this.token, this.newPassword).subscribe({
      next: (response: PasswordResetResponse) => {
        if (response.success) {
          alert('¡Contraseña cambiada exitosamente!');
          this.step = 1; // Volver al primer paso
        } else {
          alert(response.message || 'Error al cambiar la contraseña');
        }
      },
      error: (error) => alert('Error al cambiar la contraseña: ' + error.message)
    });
  }
}