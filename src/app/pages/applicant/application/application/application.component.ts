import {Component, inject} from '@angular/core';
import {ApplicationService} from '../../../../core/services/application.service';
import {AuthService} from '../../../../core/services/auth.service';
import {ApplicantService} from '../../../../core/services/applicant.service';
import {ApplicationResponse} from '../../../../shared/models/application-response.model';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent {
  private applicationService = inject(ApplicationService);
  private authService= inject(AuthService);
  private applicantService=inject(ApplicantService);
  private router=inject(Router);
  applications: ApplicationResponse[] = [];
  userId = this.authService.getUser()?.id;

  ngOnInit(): void {
    if (this.userId !== undefined) {
      this.applicantService.findApplicantByUserId(this.userId).subscribe({
        next: (applicantId) => {
          if (applicantId) {
            this.applicationService.getApplicationsByApplicantId(applicantId).subscribe({
              next: (data) => this.applications = data,
              error: (error) => console.error('Error al cargar postulaciones', error)
            });
          } else {
            console.warn('No se encontró un solicitante asociado al usuario.');
          }
        },
        error: (error) => console.error('Error al buscar solicitante por ID de usuario', error)
      });
    } else {
      console.error('El ID del usuario no está definido.');
    }
  }


  goToFollowUp(applicationId: number): void {
    this.router.navigate([`/applicant/application/myApplications/${applicationId}/follow-up`]);
  }

}
