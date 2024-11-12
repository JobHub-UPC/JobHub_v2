import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FollowUpService } from '../../../../core/services/follow-up.service';
import { FollowUpResponse } from '../../../../shared/models/follow-up-response.model';
import { CommonModule } from '@angular/common';
import { JobPhaseService } from '../../../../core/services/jobphase.service';
import { JobPhaseResponse } from '../../../../shared/models/jobphase-response.model';

@Component({
  selector: 'app-follow-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {
  followUp: FollowUpResponse | null = null;
  phases: JobPhaseResponse[] = [];  // Array para almacenar las fases
  private route = inject(ActivatedRoute);
  private followUpService = inject(FollowUpService);
  private jobPhaseService = inject(JobPhaseService); // Inyectar el servicio de fases

  constructor() {}

  ngOnInit(): void {
    const applicationId = Number(this.route.snapshot.paramMap.get('applicationId'));

    // Obtener el seguimiento de la aplicación
    this.followUpService.getFollowUp(applicationId).subscribe({
      next: (data) => {
        this.followUp = data;
        // Obtener el jobId asociado al seguimiento
        this.getJobIdByFollowUpId(data.id);
      },
      error: (error) => console.error('Error al cargar seguimiento', error)
    });
  }

  getJobIdByFollowUpId(followUpId: number): void {
    this.followUpService.getJobIdByFollowUpId(followUpId).subscribe({
      next: (jobId) => {
        this.loadJobPhases(jobId);  // Cargar las fases usando el jobId
      },
      error: (error) => console.error('Error al cargar el ID del trabajo', error)
    });
  }

  loadJobPhases(jobId: number): void {
    // Obtener las fases del trabajo usando el JobPhaseService
    this.jobPhaseService.getPhasesByJob(jobId).subscribe({
      next: (phases) => {
        this.phases = phases.sort((a, b) => this.getPhaseOrder(a.orderPhase) - this.getPhaseOrder(b.orderPhase)); // Ordenar las fases
      },
      error: (error) => console.error('Error al cargar fases del trabajo', error)
    });
  }

  getPhaseOrder(orderPhase: string): number {
    // Esta función convierte los valores del enum a números para ordenar las fases
    switch (orderPhase) {
      case 'FIRST':
        return 1;
      case 'SECOND':
        return 2;
      case 'THIRD':
        return 3;
      case 'FOURTH':
        return 4;
      case 'FIFTH':
        return 5;
      default:
        return 0;
    }
  }

  getPhaseProgress(phase: JobPhaseResponse): string {
    // Calcular el progreso basado en el orden de las fases
    if (!this.followUp) {
      return '0%';
    }

    const currentPhaseOrder = this.getPhaseOrder(this.followUp.jobPhaseName); // Fase actual del seguimiento
    const phaseOrder = this.getPhaseOrder(phase.orderPhase);

    // Si la fase es la actual o anterior, es completada
    if (phaseOrder < currentPhaseOrder) {
      return '100%';
    }

    // Si la fase está en progreso
    if (phaseOrder === currentPhaseOrder) {
      return '50%';  // Aquí podrías ajustar el valor basado en algún otro criterio (por ejemplo, un timestamp)
    }

    return '0%';  // Fases aún no alcanzadas
  }
}
