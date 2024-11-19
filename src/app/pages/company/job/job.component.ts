import { Component, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { JobDetailsModel } from '../../../shared/models/job-details.model';
import { JobService } from '../../../core/services/job.service';
import {AuthService} from '../../../core/services/auth.service';
import {CompanyService} from '../../../core/services/company.service';
import {Observable, tap} from 'rxjs';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [NgForOf, NgIf, RouterLink],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent {
  jobs: JobDetailsModel[] = [];
  filteredJobs: JobDetailsModel[] = [];
  selectedJob: JobDetailsModel | null = null;
  company: number=0;
  private authService = inject(AuthService);
  private jobService = inject(JobService);
  private router = inject(Router);
  private companyService=inject(CompanyService);
  ngOnInit(): void {
    this.loadJobs();
  }
  findCompanyIdByUserId(id: number): Observable<number | null> {
    return this.companyService.getCompanyIdByUserId(id).pipe(
      tap({
        next: (company) => {
          if (company != null) {
            this.company = company;
          }
        },
        error: (error) => console.error('Error al cargar la empresa', error)
      })
    );
  }
  loadJobs(): void {
    const userId = this.authService.getUser()?.id;
    if (userId != null) {
      this.findCompanyIdByUserId(userId).subscribe({
        next: (companyId) => {
          if (companyId != null) {
            this.jobService.getJobsByCompany(companyId).subscribe({
              next: (jobs) => {
                this.jobs = jobs;
                this.filteredJobs = jobs;
              },
              error: (error) => console.error('Error al cargar los trabajos', error)
            });
          } else {
            console.warn('No se encontró una empresa para este usuario.');
          }
        },
        error: (error) => console.error('Error al obtener el ID de la empresa', error)
      });
    } else {
      console.warn('No se encontró un usuario autenticado.');
    }
  }
  selectJob(job: JobDetailsModel): void {
    this.selectedJob = job;
  }

  editJob(jobId: number): void {
    this.router.navigate(['/company/job-register', jobId]);
  }

  deleteJob(jobId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este trabajo?')) {
      this.jobService.deleteJob(jobId).subscribe({
        next: () => {
          this.loadJobs();
          this.selectedJob = null;
        },
        error: (error) => console.error('Error al eliminar el trabajo', error)
      });
    }
  }
  viewApplications(jobId: number): void {
    this.router.navigate(['/company/job/applications', jobId]);
  }
}
