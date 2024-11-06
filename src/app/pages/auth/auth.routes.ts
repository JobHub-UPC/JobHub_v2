import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

export const authRoutes:Routes=[
    {
        path:'',
        component:AuthLayoutComponent,
        children:[
            {path:'login',component:LoginComponent},
            {path:'register',component:RegisterComponent},
            //{path:'recover-password',component:ForgotPasswordComponent}
        ]
    }
]