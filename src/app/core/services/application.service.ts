import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {ApplicationRequest} from '../../shared/models/application-request.model';
import {Observable} from 'rxjs';
import {ApplicationResponse} from '../../shared/models/application-response.model';

@Injectable({providedIn: 'root'})
export class ApplicationService {
  private baseURL = `${environment.apiUrl}/admin/applications`;  // Ajusta el endpoint según tu API
  private http=inject(HttpClient);
  constructor() {
  }
  register(register:ApplicationRequest):Observable<ApplicationResponse>{
    return this.http.post<ApplicationResponse>(`${this.baseURL}`,register);
  }
  getApplicationsByApplicantId(applicantId:number):Observable<ApplicationResponse[]>{  // Ajusta el tipo de retorno según tu API
    return this.http.get<ApplicationResponse[]>(`${this.baseURL}/applicant/${applicantId}`);
  }
}
