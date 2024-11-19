import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import {FollowUpResponse} from '../../../shared/models/follow-up-response.model';
import {JobPhaseResponse} from '../../../shared/models/jobphase-response.model';
import {FollowUpService} from '../../../core/services/follow-up.service';
import {JobPhaseService} from '../../../core/services/jobphase.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-follow-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {
  followUp: FollowUpResponse | null = null;
  phases: JobPhaseResponse[] = [];  // Array para almacenar las fases
  statusOptions: string[] = ['RECEIVED', 'REVISION', 'APPROVED', 'DENIED']; // Opciones de estado

  private route = inject(ActivatedRoute);
  private followUpService = inject(FollowUpService);
  private jobPhaseService = inject(JobPhaseService); // Inyectar el servicio de fases

  constructor() {}

  ngOnInit(): void {
    const applicationId = Number(this.route.snapshot.paramMap.get('id'));

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
      case 'FIRST': return 1;
      case 'SECOND': return 2;
      case 'THIRD': return 3;
      case 'FOURTH': return 4;
      case 'FIFTH': return 5;
      default: return 0;
    }
  }

  updateStatus(): void {
    if (this.followUp) {
      this.followUpService.updateStatus(this.followUp.id, this.followUp.status).subscribe({
        next: () => alert('Estado actualizado con éxito'),
        error: (error) => console.error('Error al actualizar estado', error)
      });
    }
  }

  updatePhase(): void {
    if (this.followUp) {
      console.log(this.followUp.jobphase_id);
      this.followUpService.updatePhaseFollowUp(this.followUp.id, this.followUp.jobphase_id).subscribe({
        next: () => alert('Fase actualizada con éxito'),
        error: (error) => console.error('Error al actualizar fase', error)
      });
    }
  }
}
