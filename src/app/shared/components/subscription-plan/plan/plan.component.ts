import {Component, inject} from '@angular/core';
import {PlanDetails} from '../../../models/plan-details.model';
import {PlanService} from '../../../../core/services/plan.service';
import {Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {SharedDataService} from '../../../../core/services/shared-data.service';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    NgForOf,NgIf,RouterLink
  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})
export class PlanComponent {
  plans:PlanDetails[]=[];
  private sharedDataService=inject(SharedDataService);
  private planService=inject(PlanService);
  private router=inject(Router)
  constructor() {
  }
  ngOnInit():void{
    this.planService.getPlans().subscribe({next:(plans)=>{
      this.plans=plans;
      console.log('Planes cargados',plans);
    },error:(error) => console.error('Error al cargar los planes',error)
    })
  }

  selectPlan(id: number) {
    this.sharedDataService.changePlanId(id);
    console.log('Plan seleccionado',id);
    this.router.navigate(['subscription/subscriptionPay']);
  }
  viewSubscriptionHistory() {
    this.router.navigate(['subscription/history']);
  }
}
