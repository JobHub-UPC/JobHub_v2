import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlanDetails} from '../../shared/models/plan-details.model';

@Injectable({providedIn: 'root'})
export class PlanService {
  private baseUrl=`${environment.apiUrl}/subscription-plans`;
  private http=inject(HttpClient);
  constructor() {
  }
  getPlans():Observable<PlanDetails[]>{
    return this.http.get<PlanDetails[]>(`${this.baseUrl}`);
  }
  getPlanById(id:number):Observable<PlanDetails>{
    return this.http.get<PlanDetails>(`${this.baseUrl}/${id}`);
  }
}
