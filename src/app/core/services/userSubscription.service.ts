import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environments';
import {Observable} from 'rxjs';
import {UserSubscriptionRequest} from '../../shared/models/user-subscription-request.model';
import {UserSubscriptionResponse} from '../../shared/models/user-subscription-response.model';

@Injectable({providedIn: 'root'})
export class UserSubscriptionService {
  private baseURL = `${environment.apiUrl}/user-subscription`;  // Ajusta el endpoint según tu API
  private http=inject(HttpClient);
  constructor() {
  }
  registerSubscription(registration:UserSubscriptionRequest):Observable<UserSubscriptionResponse>{
    return this.http.post<UserSubscriptionResponse>(`${this.baseURL}`,registration);
  }

}
