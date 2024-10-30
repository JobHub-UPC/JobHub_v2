import { Component, Input } from '@angular/core';
import { JobActionsComponent } from '../job-actions/job-actions.component';
import { JobInfoComponent } from '../job-info/job-info.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [JobActionsComponent, JobInfoComponent, CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent {
  @Input() job: any;
}
