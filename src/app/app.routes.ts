
import { ProfileLayoutComponent } from './shared/components/profile/profile-layout/profile-layout.component';
import { authInverseGuard } from './core/guards/auth-inverse.guard';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home-layout/home-layout.component';
import { Routes } from '@angular/router';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';


export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent,
        canActivate:[authGuard]
    },
    { path: 'applicant', loadChildren:()=>import('./pages/applicant/applicant.routes').then(m=>m.applicantRoutes),
        canActivate:[authGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.authRoutes),
        canActivate:[authInverseGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate:[authInverseGuard],
    }
];
