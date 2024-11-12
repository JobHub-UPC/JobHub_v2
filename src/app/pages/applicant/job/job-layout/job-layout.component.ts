import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { JobDetailsModel } from '../../../../shared/models/job-details.model';
import { JobService } from '../../../../core/services/job.service';
import {Router, RouterLink} from '@angular/router';
import { ApplicationService } from '../../../../core/services/application.service';
import { ApplicantService } from '../../../../core/services/applicant.service';
import { AuthService } from '../../../../core/services/auth.service';
import { FollowUpService } from '../../../../core/services/follow-up.service';
import { JobPhaseService } from '../../../../core/services/jobphase.service';
import { JobPhaseResponse } from '../../../../shared/models/jobphase-response.model';
import { catchError, map, Observable, of } from 'rxjs';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  logo: string;
  isVerified?: boolean;
  timeAgo: string;
  isPromoted?: boolean;
  alumniCount?: number;
}

@Component({
  selector: 'app-job-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './job-layout.component.html',
  styleUrl: './job-layout.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class JobLayoutComponent {
  jobs: JobDetailsModel[] = [];
  filteredJobs: JobDetailsModel[] = [];
  selectedJob: any = null;

  private jobPhaseService = inject(JobPhaseService);
  private authService = inject(AuthService);
  private applicantService = inject(ApplicantService);
  private applicationService = inject(ApplicationService);
  private followUpService = inject(FollowUpService);
  private jobService = inject(JobService);
  private router = inject(Router);

  ngOnInit(): void {
    this.jobService.getJobsDetails().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.filteredJobs = jobs;
      },
      error: (error) => console.error('Error al cargar los trabajos', error),
    });
  }

  selectJob(job: any) {
    this.selectedJob = job;
  }

  applyToJob(job: any) {
    const userId = this.authService.getUser()?.id;

    if (!userId) {
      console.error('El usuario no está autenticado');
      return;
    }

    this.applicantService.findApplicantByUserId(userId).subscribe({
      next: (applicantId) => {
        if (applicantId) {
          this.applicationService.register({ applicantId, jobId: job.id }).subscribe({
            next: (application) => {
              console.log('Aplicación exitosa', application);
              this.createFollowUp(application.id, job.id);
            },
            error: (error) => console.error('Error al aplicar al trabajo', error),
          });
        } else {
          console.error('No se encontró un solicitante para el usuario');
        }
      },
      error: (error) => console.error('Error al buscar el solicitante por ID de usuario', error),
    });
  }

  getFirstJobPhaseId(jobId: number): Observable<number | null> {
    return this.jobPhaseService.getPhasesByJob(jobId).pipe(
      map((phases: JobPhaseResponse[]) => {
        const firstPhase = phases.find((phase) => phase.orderPhase === 'FIRST');
        return firstPhase ? firstPhase.id : null;
      }),
      catchError((error) => {
        console.error('Error al obtener las fases del trabajo', error);
        return of(null);
      })
    );
  }

  createFollowUp(applicantId: number, jobId: number) {
    this.getFirstJobPhaseId(jobId).subscribe({
      next: (jobPhaseId) => {
        if (!jobPhaseId) {
          console.error('No se encontró la primera fase del trabajo');
          return;
        }

        const status = 'RECEIVED';
        console.log('Creando seguimiento', { applicantId, jobPhaseId, status });
        this.followUpService.createFollowUp({ applicantId, jobPhaseId, status }).subscribe({
          next: (followUp) => {
            console.log('Seguimiento creado', followUp);
            this.router.navigate([`/myApplications/${applicantId}/follow-up`]);
          },
          error: (error) => console.error('Error al crear seguimiento', error),
        });
      },
      error: (error) => console.error('Error al obtener el ID de la primera fase del trabajo', error),
    });
  }
}
