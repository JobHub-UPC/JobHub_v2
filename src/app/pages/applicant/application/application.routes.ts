import {Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {ApplicationComponent} from './application/application.component';
import {FollowUpComponent} from './follow-up/follow-up.component';

export const applicationRoutes:Routes=[
  {
    path:'',
    component:LayoutComponent,
    children:[
      {path:'',redirectTo:'myApplications',pathMatch:'full'},
      {path:'myApplications',component:ApplicationComponent},
      {path:'myApplications/:applicationId/follow-up',component:FollowUpComponent}
    ]
  }
]
