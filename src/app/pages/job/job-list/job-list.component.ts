import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JobItemComponent } from '../job-item/job-item.component';
import { Job } from '../job-layout/job-layout.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, JobItemComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})

export class JobListComponent {
  @Input() jobs!: Job[];
  @Output() jobSelected = new EventEmitter<Job>();
  selectedJob: Job | null = null;

  selectJob(job: Job) {
    this.selectedJob = job;
    this.jobSelected.emit(job);
  }
}