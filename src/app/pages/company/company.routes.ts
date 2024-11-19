import {Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {JobComponent} from './job/job.component';
import {JobRegisterComponent} from './job-register/job-register.component';
import {ApplicationComponent} from './application/application.component';
import {FollowUpComponent} from './follow-up/follow-up.component';

export const companyRoutes: Routes = [
  {
    path:'', component: LayoutComponent,
    children:[
      { path: '', redirectTo: 'job', pathMatch: 'full' },  // This redirects to 'job' on the root path
      {path:'job',component:JobComponent},
      {path:'job-register',component:JobRegisterComponent},
      {path:'job-register/:id',component:JobRegisterComponent},
      {path:'job/applications/:id',component:ApplicationComponent},
      {path:'job/application/follow-up/:id',component:FollowUpComponent}
    ]
  },


]
