
import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserSubscriptionResponse} from '../../../models/user-subscription-response.model';
import {UserSubscriptionService} from '../../../../core/services/userSubscription.service';

@Component({
  selector: 'app-subscription-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-history.component.html',
  styleUrl: './subscription-history.component.css'
})
export class SubscriptionHistoryComponent {
  subscriptions: UserSubscriptionResponse[] = [];
  private subscriptionService = inject(UserSubscriptionService);

  ngOnInit(): void {
    this.subscriptionService.getHistory().subscribe({
      next: (subscriptions) => {
        this.subscriptions = subscriptions;
        console.log('Historial de suscripciones cargado', subscriptions);
      },
      error: (error) => console.error('Error al cargar el historial de suscripciones', error)
    });
  }
}
