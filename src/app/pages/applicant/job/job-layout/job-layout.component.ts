
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  logo: string;
  isVerified?: boolean;
  timeAgo: string;
  isPromoted?: boolean;
  alumniCount?: number;
}

@Component({
  selector: 'app-job-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './job-layout.component.html',
  styleUrl: './job-layout.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Añadir esto aquí
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
      alumniCount: 15,
      description: 'Darás soporte al Latam Tool Depot Lead con el seguimiento de una gran cantidad de action points y cumplimiento de entregables...',
    },
    {
      id: 2,
      company: 'BCP',
      logo: '/assets/img/bcp.jpg',
      title: 'hola Python Engineer',
      location: 'Uruguay, Departamento de Loreto, Perú (En remoto)',
      type: 'Full-time',
      timeAgo: '1 día',
      isPromoted: true,
      isVerified: true,
      alumniCount: 20,
      description: 'Será responsable de implementar y mantener servicios en Python para soportar el backend de nuestras aplicaciones...',
    },
    {
      id: 3,
      company: 'UPC',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/UPC_logo_transparente.png',
      title: 'Junior Python Engineer',
      location: 'Lima, Perú (En remoto)',
      type: 'Full-time',
      timeAgo: '1 día',
      isPromoted: false,
      isVerified: false,
      alumniCount: 10,
      description: 'Colaborarás con el equipo para desarrollar nuevas funcionalidades y mejorar la experiencia de usuario en nuestra plataforma...',
    },
    // Agrega más trabajos aquí
  ];

  selectedJob: any = null;

  selectJob(job: any) {
    this.selectedJob = job;
  }
}

