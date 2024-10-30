import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-info.component.html',
  styleUrl: './job-info.component.css'
})
export class JobInfoComponent {
  @Input() job: any;
}
