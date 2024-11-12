import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JobPhaseResponse} from '../../shared/models/jobphase-response.model';
import {JobPhaseRequest} from '../../shared/models/jobphase-request.model';

@Injectable({providedIn: 'root'})
export class JobPhaseService {
  private baseURL = `${environment.apiUrl}/jobphases`;  // Ajusta el endpoint según tu API
  private http=inject(HttpClient);
  constructor() {}
  createJobPhase(jobPhase: JobPhaseRequest):Observable<JobPhaseResponse> {
    return this.http.post<JobPhaseResponse>(this.baseURL, jobPhase);
  }
  getPhasesByJob(jobId: number):Observable<JobPhaseResponse[]> {
    return this.http.get<JobPhaseResponse[]>(`${this.baseURL}/job/${jobId}`);
  }
}
