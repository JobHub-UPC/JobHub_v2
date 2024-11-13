import {LayoutComponent} from './layout/layout.component';
import {PlanComponent} from './plan/plan.component';
import {BuySubscriptionComponent} from './buy-subscription/buy-subscription.component';
import {Routes} from '@angular/router';
import {SubscriptionHistoryComponent} from './subscription-history/subscription-history.component';

export const subscriptionPlanRoutes:Routes = [
  {
    path:'',component :LayoutComponent,
    children:[
      {path:'',redirectTo:'plans',pathMatch:'full'},
      {path:'plans',component:PlanComponent},
      {path:'subscriptionPay',component: BuySubscriptionComponent},
      {path:'history',component: SubscriptionHistoryComponent}
    ]
  }
]
