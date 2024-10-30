import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../job-layout/job-layout.component';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  @Input() job!: Job;
}
