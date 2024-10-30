import { Component, Input } from '@angular/core';
import { JobLayoutComponent } from '../job-layout/job-layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-item.component.html',
  styleUrl: './job-item.component.css'
})
export class JobItemComponent {
  @Input() job: any;
  @Input() isSelected: boolean = false;
}
