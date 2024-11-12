import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { SharedDataService } from '../../../../core/services/shared-data.service';
import { PlanService } from '../../../../core/services/plan.service';
import { UserSubscriptionService } from '../../../../core/services/userSubscription.service';
import {UserSubscriptionRequest} from '../../../models/user-subscription-request.model';
import {CommonModule} from '@angular/common';
import {CheckoutService} from '../../../../core/services/checkout.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';

@Component({
  selector: 'app-buy-subscription',
  standalone: true,
  imports: [
    ReactiveFormsModule,CommonModule
  ],
  templateUrl: './buy-subscription.component.html',
  styleUrls: ['./buy-subscription.component.css']
})
export class BuySubscriptionComponent {
  userId: number=0;
  planId!: number | null;
  userSubscriptionForm!: FormGroup;
  private sharedDataService = inject(SharedDataService);
  private planService = inject(PlanService);
  private userSubscriptionService = inject(UserSubscriptionService);
  private formBuilder = inject(FormBuilder);
  private checkoutService=inject(CheckoutService);
  private router=inject(Router);
  private route=inject(ActivatedRoute);
  private authService=inject(AuthService);
  ngOnInit(): void {
    this.userId=this.authService.getUser()?.id||0;
    const token=this.route.snapshot.queryParamMap.get('token');
    const payerId = this.route.snapshot.queryParamMap.get('PayerID');
    if (token && payerId) {
      this.checkoutService.capturePaypalOrder(token)
        .subscribe(response => {
          if (response.completed) {
            this.router.navigate(['/subscription/subscriptionPay', response.purchaseId]);
          }
        })
    }
    // Inicialización del formulario
    this.userSubscriptionForm = this.formBuilder.group({
      months: [1, [Validators.required, Validators.min(1)]], // Default 1 mes
    });

    // Suscripción al ID del plan compartido
    this.sharedDataService.currentPlanId.subscribe(
      id => {
        this.planId = id;
        console.log('Plan seleccionado', id);
      },
      error => console.error('Error al obtener el plan', error)
    );
  }

  buySubscription(): void {
    if (this.userSubscriptionForm.valid && this.planId !== null) {
      const subscriptionRequest: UserSubscriptionRequest = {
        subscriptionPlan_id: this.planId, // Mapea correctamente a `suscriptionPlan_id`
        months: this.userSubscriptionForm.value.months,
      };
      console.log('Solicitud de suscripción', subscriptionRequest);
      this.userSubscriptionService.registerSubscription(subscriptionRequest).subscribe(
        UserSubscriptionResponse =>{ console.log('Suscripción exitosa', UserSubscriptionResponse);
          this.checkoutService.createPaypalOrder(UserSubscriptionResponse.id)
            .subscribe(response => {
              window.location.href = response.paypalUrl;
            })
        },
        error => console.error('Error al registrar la suscripción', error)
      );
    }

  }

}
