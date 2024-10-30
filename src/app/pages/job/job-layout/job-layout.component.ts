import { Component } from '@angular/core';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { JobItemComponent } from '../job-item/job-item.component';
import { JobRecommendationsComponent } from '../job-recommendations/job-recommendations.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-layout',
  standalone: true,
  imports: [JobDetailsComponent, JobItemComponent, JobRecommendationsComponent, CommonModule],
  templateUrl: './job-layout.component.html',
  styleUrl: './job-layout.component.css'
})
export class JobLayoutComponent {

  jobs = [
    {
      id: 1,
      company: 'Sophilabs',
      logo: '/placeholder.svg',
      title: 'Junior Python Engineer',
      location: 'Uruguay, Departamento de Loreto, Perú (En remoto)',
      type: 'Full-time',
      timeAgo: '1 día',
      isPromoted: false,
      isVerified: false,
    },
    {
      id: 1,
      company: 'Sophilabs',
      logo: '/placeholder.svg',
      title: 'Junior Python Engineer',
      location: 'Uruguay, Departamento de Loreto, Perú (En remoto)',
      type: 'Full-time',
      timeAgo: '1 día',
      isPromoted: false,
      isVerified: false,
    },
    {
      id: 1,
      company: 'Sophilabs',
      logo: '/placeholder.svg',
      title: 'Junior Python Engineer',
      location: 'Uruguay, Departamento de Loreto, Perú (En remoto)',
      type: 'Full-time',
      timeAgo: '1 día',
      isPromoted: false,
      isVerified: false,
    },
    {
      id: 1,
      company: 'Sophilabs',
      logo: '/placeholder.svg',
      title: 'Junior Python Engineer',
      location: 'Uruguay, Departamento de Loreto, Perú (En remoto)',
      type: 'Full-time',
      timeAgo: '1 día',
      isPromoted: false,
      isVerified: false,
    },
    // Add more jobs here...
  ];

  selectedJob: any = null;

  onJobSelected(job: any) {
    this.selectedJob = job;
  }

  ngOnInit() {
    this.jobs = [
      {
        id: 1,
        company: 'Sophilabs',
        logo: '/placeholder.svg',
        title: 'Junior Python Engineer',
        location: 'Uruguay, Departamento de Loreto, Perú (En remoto)',
        type: 'Full-time',
        timeAgo: '1 día',
        isPromoted: false,
        isVerified: false,
      },
      // Add more job objects as necessary
    ];
    console.log(this.jobs);  // Confirm this logs the job data
  }
  
}

