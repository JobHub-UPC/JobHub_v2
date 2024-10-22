import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  //styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  private fb =inject(FormBuilder)
  private authService=inject(AuthService)
  private router=inject(Router)
  constructor() {
    this.registerForm=this.fb.group({
      phone:['',Validators.required],
      country:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      college:['',Validators.required],
    })
  }
  controlHasError(controlName: string, errorName: string): boolean {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.authService.register(userData).subscribe(
        response => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/auth/login']); // Redirige al inicio de sesión
        },
        error => {
          console.error('Error en el registro', error);
        }
      );
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
