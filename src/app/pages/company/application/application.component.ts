import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router'; // Añadir Router
import { JobService } from '../../../core/services/job.service';
import { JobDetailsModel } from '../../../shared/models/job-details.model';
import { ApplicationService } from '../../../core/services/application.service';
import {ApplicationResponse} from '../../../shared/models/application-response.model';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'] // Corrección en la importación
})
export class ApplicationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private jobService = inject(JobService);
  private applicationService = inject(ApplicationService);
  private router = inject(Router); // Inyectar Router

  applications: ApplicationResponse[] = [];
  job: JobDetailsModel | null = null;
  selectedApplication: ApplicationResponse | null = null;
  currentPhase: string = 'ALL';

  ngOnInit(): void {
    const jobId = this.route.snapshot.params['id'];
    if (jobId) {
      this.loadJobDetails(jobId);
      this.loadApplications(jobId);
    }
  }

  private loadJobDetails(jobId: number): void {
    this.jobService.getJobById(jobId).subscribe({
      next: (job) => (this.job = job),
      error: (error) => console.error('Error loading job details:', error),
    });
  }

  private loadApplications(jobId: number): void {
    this.applicationService.getApplicationsByJob(jobId).subscribe({
      next: (applications) => (this.applications = applications),
      error: (error) => console.error('Error loading applications:', error),
    });
  }

  selectApplication(application: ApplicationResponse): void {
    this.selectedApplication = application;
    // Redirigir a la vista de seguimiento con el ID de la aplicación seleccionada
    this.router.navigate(['/company/job/application/follow-up', application.id]);
  }

}
