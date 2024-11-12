import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {JobCreateUpdateModel} from '../../../shared/models/job-create-update.model';
import {AuthService} from '../../../core/services/auth.service';
import {CompanyService} from '../../../core/services/company.service';
import {JobService} from '../../../core/services/job.service';
import {JobPhaseService} from '../../../core/services/jobphase.service';
import {JobPhaseRequest} from '../../../shared/models/jobphase-request.model';

@Component({
  selector: 'app-job-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './job-register.component.html',
  styleUrl: './job-register.component.css'
})
export class JobRegisterComponent {
  private authService = inject(AuthService);
  private companyService=inject(CompanyService);
  private jobService=inject(JobService);
  private jobPhaseService=inject(JobPhaseService);
  jobForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      salary: ['', Validators.required],
      deadlineDate: ['', Validators.required],
      description: ['', Validators.required],
      jobType: ['', Validators.required],
      location: ['', Validators.required],
      phases: this.fb.array([])
    });
  }

  get phases() {
    return this.jobForm.get('phases') as FormArray;
  }
  addPhase() {
    this.phases.push(this.fb.group({
      name: ['', Validators.required]
    }));
  }

  removePhase(index: number) {
    this.phases.removeAt(index);
  }
  onSubmit() {
    if (!this.jobForm.valid) {
      console.error('El formulario no es válido');
      return;
    }

    const userid = this.authService.getUser()?.id;

    if (!userid) {
      console.error('No se pudo encontrar el usuario');
      return;
    }

    this.companyService.getCompanyIdByUserId(userid).subscribe({
      next: (companyId: number | null) => {
        if (companyId === null) {
          console.error('El ID de la compañía es nulo');
          return;
        }

        const jobDetails = this.extractJobDetails();
        const formData: JobCreateUpdateModel = {
          ...jobDetails,
          salary: parseFloat(jobDetails.salary), // Convertir a número
          deadlineDate: new Date(jobDetails.deadlineDate), // Convertir a Date
          companyId: companyId // Garantizado como número
        };

        this.jobService.register(formData).subscribe({
          next: (job) => {
            console.log('Trabajo registrado', job);
            this.savePhases(job.id); // Guarda las fases después de registrar el trabajo
          },
          error: (error) => {
            console.error('Error al registrar el trabajo', error);
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener el ID de la compañía', error);
      }
    });
  }

  savePhases(jobId: number) {
    const orderPhases = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH']; // Define los valores posibles

    this.phases.controls.forEach((phase, index) => {
      if (index >= orderPhases.length) {
        console.error('No se pueden agregar más de 5 fases');
        return;
      }

      const phaseData: JobPhaseRequest = {
        name: phase.value.name,
        jobId: jobId,
        orderPhase: orderPhases[index] // Asigna el valor correspondiente basado en el índice
      };

      this.jobPhaseService.createJobPhase(phaseData).subscribe({
        next: (response) => console.log('Fase registrada', response),
        error: (error) => console.error('Error al registrar la fase', error),
      });
    });
  }

  private extractJobDetails() {
    const { title, salary, deadlineDate, description, jobType, location } = this.jobForm.value;
    return { title, salary, deadlineDate, description, jobType, location };
  }

}
