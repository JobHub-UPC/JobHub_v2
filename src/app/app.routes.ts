import { GroupDetailsComponent } from './pages/group/group-details/group-details.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home-layout/home-layout.component';
import { ProfileLayoutComponent } from './pages/profile/profile-layout/profile-layout.component';
import { ContactsLayoutComponent } from './pages/contacts/contacts-layout/contacts-layout.component';
import { JobLayoutComponent } from './pages/job/job-layout/job-layout.component';
import { GroupLayoutComponent } from './pages/group/group-layout/group-layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'profile', component: ProfileLayoutComponent},
    { path: 'jobs', component: JobLayoutComponent},
    { path: 'contacts', component: ContactsLayoutComponent},
    //{ path: 'groups', component: GroupLayoutComponent},

    { 
        path: 'groups',
        loadComponent: () => import('./pages/group/group-layout/group-layout.component').then(m => m.GroupLayoutComponent)
      },
      {
        path: 'groups/:id',
        loadComponent: () => import('./pages/group/group-details/group-details.component').then(m => m.GroupDetailsComponent)
      },

    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.authRoutes),
    }
];
