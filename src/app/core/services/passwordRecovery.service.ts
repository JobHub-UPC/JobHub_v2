import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PasswordRecoveryRequest } from '../../shared/models/password-recovery-request.model';
import { PasswordRecoveryResponse } from '../../shared/models/password-recovery-response.model';
import { TokenValidationResponse } from '../../shared/models/token-validation-response.model';
import { PasswordResetRequest } from '../../shared/models/password-reset-request.model';
import { PasswordResetResponse } from '../../shared/models/password-reset-response.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {
    private baseUrl = `${environment.apiUrl}`;


    constructor(private http: HttpClient) {}

    // Paso 1: Enviar correo de recuperación
    sendRecoveryEmail(email: string): Observable<PasswordRecoveryResponse> {
      const data: PasswordRecoveryRequest = { email }; // Empaquetamos el email en un objeto
      return this.http.post<PasswordRecoveryResponse>(`${this.baseUrl}/sendMail`, data);
    }

    sendPasswordRecoveryRequest(email: string) {
      return this.http.post(`${environment.apiUrl}/mail/sendMail`, email, {
          headers: { 'Content-Type': 'application/json' },
      });
    }


// Paso 2: Verificar el token
validateToken(token: string): Observable<TokenValidationResponse> {
  const authToken = localStorage.getItem('authToken'); // Reemplaza esto por la lógica para obtener el token de autenticación
  const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  
  return this.http.get<TokenValidationResponse>(`${this.baseUrl}/reset/check/${token}`, { headers });
}

  
    // Paso 3: Cambiar la contraseña
    resetPassword(token: string, newPassword: string): Observable<PasswordResetResponse> {
      const data: PasswordResetRequest = { token, newPassword }; // Empaquetamos el token y la nueva contraseña
      return this.http.post<PasswordResetResponse>(`${this.baseUrl}/reset`, data);
    }
  }