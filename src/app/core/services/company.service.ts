import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({providedIn:'root'})
export class CompanyService {
  private baseUrl=`${environment.apiUrl}/admin/companies`;
  private http=inject(HttpClient);
  private authService=inject(AuthService);
  constructor() {
  }
  getCompanyIdByUserId(userId:number):Observable<number | null>{
    return this.http.get<number|null>(`${this.baseUrl}/findCompanyIdByUserId/${userId}`);
  }
}
