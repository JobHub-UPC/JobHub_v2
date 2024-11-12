import {Component, inject} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {isEmpty} from 'rxjs';
import {JobDetailsModel} from '../../../shared/models/job-details.model';
import {JobService} from '../../../core/services/job.service';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent {
  jobs:JobDetailsModel[]=[];
  filteredJobs: JobDetailsModel[] = []
  selectedJob: any = null;
  private jobService = inject(JobService);
  private router=inject(Router)
  constructor() {
  }
  ngOnInit():void{
    this.jobService.getJobsDetails().subscribe({
      next:(jobs)=>{
      this.jobs=jobs;
      this.filteredJobs = jobs;
    },error:(error) => console.error('Error al cargar los trabajos',error)})
  }
  selectJob(job: any) {
    this.selectedJob = job;
  }

  protected readonly RouterLink = RouterLink;
  protected readonly isEmpty = isEmpty;
}
