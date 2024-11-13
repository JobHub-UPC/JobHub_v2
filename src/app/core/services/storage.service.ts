import { Injectable } from '@angular/core';
import { AuthResponse } from '../../shared/models/auth-response.model';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private authKey = 'authToken';

  constructor() {}

  setAuthData(data: AuthResponse): void {
    localStorage.setItem(this.authKey, JSON.stringify(data));
  }

  getAuthData(): AuthResponse | null {
    const data = localStorage.getItem(this.authKey);
    return data ? JSON.parse(data) as AuthResponse : null;
  }


  getAuthToken(): string | null {
    const data = localStorage.getItem(this.authKey);
    return data ? JSON.parse(data).token : null; // Asegúrate de que `data` contiene el campo `token`
  }

  clearAuthData(): void {
    localStorage.removeItem(this.authKey);
  }
}
