import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environments';
import { UserProfile } from '../../shared/models/user-profile.model';
import { ApplicantRequest } from '../../shared/models/applicant-request.model';
import { ApplicantResponse } from '../../shared/models/applicant-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private baseURL = `${environment.apiUrl}/user/profile`;

  private http = inject(HttpClient);

  getUserProfile(userId: number): Observable<ApplicantResponse> {
    return this.http.get<ApplicantResponse>(`${this.baseURL}/${userId}`);
  }

  updateUserProfile(
    userId: number,
    profileData: ApplicantResponse
  ): Observable<ApplicantResponse> {
    return this.http.put<ApplicantResponse>(`${this.baseURL}/${userId}`, profileData);
  }
}
