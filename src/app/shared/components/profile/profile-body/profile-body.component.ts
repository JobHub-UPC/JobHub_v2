import { AuthService } from './../../../../core/services/auth.service';
import { UserProfileService } from './../../../../core/services/user-profile.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserProfile } from '../../../models/user-profile.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { ApplicantResponse } from '../../../models/applicant-response.model';

@Component({
  selector: 'app-profile-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-body.component.html',
  styleUrl: './profile-body.component.css',
})
export class ProfileBodyComponent implements OnInit {
  
  profile!: ApplicantResponse

  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const authData = this.authService.getUser();
    console.log(authData);
    const userId = authData?.id;
    console.log(userId);

    if (userId) {
      this.userProfileService.getUserProfile(userId).subscribe({
        next: (profile) => {
          this.profile = profile;
          console.log(profile);
          this.showSnackBar('Perfil cargado con éxito');
        },
        error: (error) => {

          this.showSnackBar('Error al cargar el perfil');
        }
      });
    } else {

      this.showSnackBar('Usuario no autenticado');
      this.router.navigate(['/auth/login']);
    }
  }

  navigateToUpdateProfile():void {
    this.router.navigate(['applicant/profile/update']);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  // Paths for images
  coverImage = 'assets/img/bcp.jpg';
  profileImage = 'assets/img/carla.jpg';
  universityLogo =
    'https://upload.wikimedia.org/wikipedia/commons/f/fc/UPC_logo_transparente.png';

  // Profile data
  contactsCount = 7;

  // Data for education items
  /*
  educationItems = [
    {
      institution: 'Universidad Peruana de Ciencias Aplicadas',
      fieldOfStudy: 'Ciencias de la computación',
      startDate: 'mar. 2022',
      additionalInfo: ['Ciencias de la computación'],
    },
    {
      logo: 'https://www.icpna.edu.pe/static/img/logo.svg',
      institution: 'ICPNA',
      fieldOfStudy: 'Enseñanza de inglés como lengua extranjera',
      startDate: 'sept. 2019 - mar. 2023',
      additionalInfo: ['Inglés'],
      certificate: {
        thumbnail:
          'https://d20ohkaloyme4g.cloudfront.net/img/document_thumbnails/455b911b128543e7d9dc67d9d3225c45/thumb_1200_1528.png',
        title: 'Certificado',
        description: 'Certificado de estudios',
      },
    },
  ];
  */

}
