import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {FollowUpResponse} from '../../shared/models/follow-up-response.model';
import {FollowUpRequest} from '../../shared/models/follow-up-request.model';

@Injectable({providedIn: 'root'})
export class FollowUpService {
  private baseURL = `${environment.apiUrl}/follow-up-application`;  // Ajusta el endpoint según tu API
  private http=inject(HttpClient);

  constructor() {}
  createFollowUp(followUp: FollowUpRequest):Observable<FollowUpResponse> {
    return this.http.post<FollowUpResponse>(this.baseURL, followUp);
  }
  getJobIdByFollowUpId(followUpId: number): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/job/${followUpId}`);
  }
  getFollowUp(applicationId: number): Observable<FollowUpResponse> {
    return this.http.get<number | null>(`${this.baseURL}/application/${applicationId}`).pipe(
      switchMap((followUpId) => {
        if (followUpId === null) {
          console.error('No se encontró un seguimiento para la aplicación proporcionada');
          return throwError(() => new Error('Seguimiento no encontrado'));
        }
        return this.http.get<FollowUpResponse>(`${this.baseURL}/${followUpId}`);
      }),
      catchError((error) => {
        console.error('Error al obtener el seguimiento por null', error);
        return throwError(() => error);
      })
    );
  }

}
