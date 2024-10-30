import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JobItemComponent } from '../job-item/job-item.component';

@Component({
  selector: 'app-job-recommendations',
  standalone: true,
  imports: [CommonModule, JobItemComponent],
  templateUrl: './job-recommendations.component.html',
  styleUrls: ['./job-recommendations.component.css'] // Corrección aquí
})
export class JobRecommendationsComponent {
  @Input() jobs: any[] = [];
  @Input() selectedJob: any;

  @Output() jobSelected = new EventEmitter<any>();

  trackByJobId(index: number, job: any) {
    return job.id;
  }

  selectJob(job: any) {
    this.jobSelected.emit(job);
  }
}
