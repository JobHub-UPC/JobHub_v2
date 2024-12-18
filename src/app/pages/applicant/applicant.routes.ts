import { Routes } from "@angular/router"
import { LayoutComponent } from "./layout/layout.component"
import { JobLayoutComponent } from "./job/job-layout/job-layout.component"
import { ContactsLayoutComponent } from "./contacts/contacts-layout/contacts-layout.component"
import { ProfileLayoutComponent } from "../../shared/components/profile/profile-layout/profile-layout.component"
import { ProfileUploadComponent } from "../../shared/components/profile/profile-upload/profile-upload.component"
export const applicantRoutes:Routes=[
{
    path:'',
    component:LayoutComponent,
    children:[
      {path:'',redirectTo:'job',pathMatch:'full'},
        {path:'job',component:JobLayoutComponent},
        {path:'contacts',component:ContactsLayoutComponent},
        {path:'profile',component:ProfileLayoutComponent},
        {path:'profile/update', component:ProfileUploadComponent},
        {path:'application',loadChildren:()=>import('./application/application.routes').then(m=>m.applicationRoutes)}
    ]
}
]
