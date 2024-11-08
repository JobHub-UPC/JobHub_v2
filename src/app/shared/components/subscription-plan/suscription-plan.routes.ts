import {LayoutComponent} from './layout/layout.component';
import {PlanComponent} from './plan/plan.component';

export const subscriptionPlanRoutes = [
  {
    path:'',component :LayoutComponent,
    children:[
      {path:'plans',component:PlanComponent}
    ]
  }
]
