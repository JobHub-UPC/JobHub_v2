import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home-layout/home-layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.authRoutes),
    }
];
