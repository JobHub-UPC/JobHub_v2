import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { JobCreateUpdateModel } from '../../../shared/models/job-create-update.model';
import { AuthService } from '../../../core/services/auth.service';
import { CompanyService } from '../../../core/services/company.service';
import { JobService } from '../../../core/services/job.service';
import { JobPhaseService } from '../../../core/services/jobphase.service';
import { JobPhaseRequest } from '../../../shared/models/jobphase-request.model';
import {JobPhaseResponse} from '../../../shared/models/jobphase-response.model';

@Component({
  selector: 'app-job-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './job-register.component.html',
  styleUrl: './job-register.component.css'
})
export class JobRegisterComponent implements OnInit {
  private authService = inject(AuthService);
  private companyService = inject(CompanyService);
  private jobService = inject(JobService);
  private jobPhaseService = inject(JobPhaseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // Para obtener parámetros de la URL

  jobForm: FormGroup;
  jobId?: number; // Para almacenar el ID del trabajo si estamos en edición

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      salary: ['', Validators.required],
      deadlineDate: ['', Validators.required],
      description: ['', Validators.required],
      jobType: ['', Validators.required],
      location: ['', Validators.required],
      phases: this.fb.array([]) // FormArray para fases
    });
  }

  ngOnInit() {
    // Verificar si hay un ID de trabajo en la URL
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.jobId = +params['id'];
        this.loadJobData(this.jobId);
      }
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

    const userId = this.authService.getUser()?.id;

    if (!userId) {
      console.error('No se pudo encontrar el usuario');
      return;
    }

    this.companyService.getCompanyIdByUserId(userId).subscribe({
      next: (companyId: number | null) => {
        if (companyId === null) {
          console.error('El ID de la compañía es nulo');
          return;
        }

        const jobDetails = this.extractJobDetails();
        const formData: JobCreateUpdateModel = {
          ...jobDetails,
          salary: parseFloat(jobDetails.salary),
          deadlineDate: new Date(jobDetails.deadlineDate),
          companyId: companyId
        };

        if (this.jobId) {
          // Modo edición
          this.jobService.update(this.jobId, formData).subscribe({
            next: (job) => {
              console.log('Trabajo actualizado', job);
              this.savePhases(job.id);
            },
            error: (error) => {
              console.error('Error al actualizar el trabajo', error);
            }
          });
        } else {
          // Modo creación
          this.jobService.register(formData).subscribe({
            next: (job) => {
              console.log('Trabajo registrado', job);
              this.savePhases(job.id);
            },
            error: (error) => {
              console.error('Error al registrar el trabajo', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error al obtener el ID de la compañía', error);
      }
    });
  }

  savePhases(jobId: number) {
    const orderPhases = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'];

    // Limpiar fases existentes antes de guardar nuevas
    this.jobPhaseService.deletePhasesByJobId(jobId).subscribe({
      next: () => {
        const phaseObservables = this.phases.controls.map((phase, index) => {
          if (index >= orderPhases.length) {
            console.error('No se pueden agregar más de 5 fases');
            return null;
          }

          const phaseData: JobPhaseRequest = {
            name: phase.value.name,
            jobId: jobId,
            orderPhase: orderPhases[index]
          };

          return this.jobPhaseService.createJobPhase(phaseData);
        }).filter(obs => obs !== null);

        Promise.all(phaseObservables.map(obs => obs!.toPromise())).then(() => {
          console.log('Fases guardadas correctamente.');
          this.router.navigate(['/company/job']);
        }).catch(error => {
          console.error('Error al guardar fases', error);
        });
      },
      error: (error) => console.error('Error al limpiar fases existentes', error)
    });
  }

  private loadJobData(jobId: number) {
    this.jobService.getJobById(jobId).subscribe({
      next: (job) => {
        this.jobForm.patchValue(job);
        this.loadPhases(jobId);
      },
      error: (error) => {
        console.error('Error al cargar los datos del trabajo', error);
      }
    });
  }

  private loadPhases(jobId: number) {
    this.jobPhaseService.getPhasesByJob(jobId).subscribe({
      next: (phases: JobPhaseResponse[]) => {
        phases.forEach(phase => {
          this.phases.push(this.fb.group({
            name: [phase.name, Validators.required]
          }));
        });
      },
      error: (error) => {
        console.error('Error al cargar las fases del trabajo', error);
      }
    });
  }

  private extractJobDetails() {
    const { title, salary, deadlineDate, description, jobType, location } = this.jobForm.value;
    return { title, salary, deadlineDate, description, jobType, location };
  }
}
