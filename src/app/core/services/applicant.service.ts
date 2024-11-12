import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApplicantService {
  private baseUrl=`${environment.apiUrl}/admin/applicants`;
  private http=inject(HttpClient);
  constructor() {
  }
  findApplicantByUserId(userId:number):Observable<number | null>{
    return this.http.get<number|null>(`${this.baseUrl}/findApplicantIdByUserId/${userId}`);
  }
}
