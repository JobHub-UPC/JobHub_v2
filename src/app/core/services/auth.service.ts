import {  inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from '../../shared/models/auth-request.model';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../shared/models/auth-response.model';
import { StorageService } from './storage.service';
import { RegisterRequest } from '../../shared/models/register-request.model';
import { RegisterResponse } from '../../shared/models/register-response.model';
import { environment } from '../../../environments/environments';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    private baseURL = `${environment.apiUrl}/auth`;  // Ajusta el endpoint según tu API

    private http= inject(HttpClient);
    private storageService = inject(StorageService);

    constructor() { }

    // operador tap de RxJS. El operador tap se usa para ejecutar efectos secundarios,
    //como guardar los datos de autenticación en el local storage, sin modificar los datos que se están pasando a través del observable.
    login(authRequest: AuthRequest): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.baseURL}/login`, authRequest).pipe(
        tap(response => this.storageService.setAuthData(response))
      );
    }

    register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
      return this.http.post<RegisterResponse>(`${this.baseURL}/register/applicant`, registerRequest);
    }

    logout(): void {
      this.storageService.clearAuthData();
    }

    isAuthenticated(): boolean {
      return this.storageService.getAuthData() !== null;
    }

    getUserRole(): string | null {
      const authData = this.storageService.getAuthData();
      return authData ? authData.role : null;
    }

    getUser(): AuthResponse | null {
      const authData = this.storageService.getAuthData(); // Obtén los datos desde el StorageService
      return authData ? authData : null; // Retorna el objeto completo si existe, de lo contrario, null
    }


    
  }
