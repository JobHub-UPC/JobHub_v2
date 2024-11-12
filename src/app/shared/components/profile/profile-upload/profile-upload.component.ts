import { AuthService } from './../../../../core/services/auth.service';
import { UserProfileService } from './../../../../core/services/user-profile.service';
import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { ApplicantResponse } from '../../../models/applicant-response.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatInputModule, MatCardModule, MatSnackBarModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile-upload.component.html',
  styleUrl: './profile-upload.component.css'
})
export class ProfileUploadComponent {

  profile!: ApplicantResponse;
  profileForm: FormGroup;

  private fb = inject(FormBuilder);
  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      college: ['', [Validators.required]],
      description: ['', [Validators.required]],
      degree: ['', [Validators.required]],

    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    const authData = this.authService.getUser();
    const userId = authData?.id;

    if (userId) {
      this.userProfileService.getUserProfile(userId).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.profileForm.patchValue(profile);
        },
        error: () => {
          this.showSnackBar('Error al cargar el perfil del usuario.');
        }
      });
    } else {
      this.showSnackBar('Usuario no autenticado.');
      this.router.navigate(['/auth/login']);
    }
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.profileForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedData = { ...this.profile, ...this.profileForm.value };
      this.userProfileService.updateUserProfile(this.profile.id, updatedData).subscribe({
        next: () => {
          this.showSnackBar('Perfil actualizado exitosamente.');
          this.router.navigate(['/applicant/profile']);
        },
        error: (error) => {
          this.showSnackBar(error.error?.message || 'Error al actualizar el perfil.');
        }
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }


    /* Método para cargar la imagen y convertirla en base64
    onImageUpload(event: any): void {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onsload = () => {
          this.profileImage = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }
      */

      // Método para manejar el envío del formulario


}
