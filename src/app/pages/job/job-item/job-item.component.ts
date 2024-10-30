import { Component, Input } from '@angular/core';
import { JobLayoutComponent } from '../job-layout/job-layout.component';
import { CommonModule } from '@angular/common';
import { Job } from '../job-layout/job-layout.component';

@Component({
  selector: 'app-job-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-item.component.html',
  styleUrl: './job-item.component.css'
})
export class JobItemComponent {
  @Input() job!: Job;
  //@Input() isSelected: boolean = false; // Define `isSelected` como @Input

  @Input() selected: boolean = false;

}
