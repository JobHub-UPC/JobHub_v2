import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';
import {JobCreateUpdateModel} from '../../shared/models/job-create-update.model';
import {JobDetailsModel} from '../../shared/models/job-details.model';

@Injectable({providedIn: 'root'})
export class JobService {
  private baseURL = `${environment.apiUrl}/admin/jobs`;  // Ajusta el endpoint según tu API

  private http= inject(HttpClient);
  constructor() {
  }
  register(registerRequest: JobCreateUpdateModel): Observable<JobDetailsModel> {
    return this.http.post<JobDetailsModel>(`${this.baseURL}`, registerRequest);
  }
  getJobsDetails():Observable<JobDetailsModel[]>{
    return this.http.get<JobDetailsModel[]>(`${this.baseURL}`);
  }
}
