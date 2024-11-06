import {Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {JobComponent} from './job/job.component';
import {JobRegisterComponent} from './job-register/job-register.component';

export const companyRoutes: Routes = [
  {
    path:'', component: LayoutComponent,
    children:[
      {path:'job',component:JobComponent},
      {path:'job-register',component:JobRegisterComponent}
    ]
  }
]
