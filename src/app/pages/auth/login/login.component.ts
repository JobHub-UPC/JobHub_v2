import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthRequest } from '../../../shared/models/auth-request.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  //styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  controlHasError(control: string, error: string) {
    return this.loginForm.controls[control].hasError(error);
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('Error');
      console.log(this.loginForm.value);
      return;
    }

    const credentials: AuthRequest = this.loginForm.value;
    this.authService.login(credentials).subscribe({
      next: () => {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/home']);
      },
      error: () => {
        console.log('Error en el inicio de sesión. Por favor, intenta de nuevo.');
      },
    });
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
