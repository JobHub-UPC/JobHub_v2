import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { groupResponse } from '../../shared/models/group-response.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private baseURL = `${environment.apiUrl}/communities`;
  private http = inject(HttpClient);

  // Método para obtener la lista de grupos
  getGroups(): Observable<groupResponse[]> {
    return this.http.get<groupResponse[]>(`${this.baseURL}`);
  }

  // Método para obtener los grupos a los que pertenece un usuario
  getUserGroups(userId: number): Observable<groupResponse[]> {
    return this.http.get<groupResponse[]>(`${this.baseURL}/user/${userId}/groups`);
  }

}