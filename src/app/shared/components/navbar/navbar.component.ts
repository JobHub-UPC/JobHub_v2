import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  isMenuOpen = false; // Controla la visibilidad del menú principal
  isConfigMenuOpen = false;
  isAuthenticated: boolean = false;
  private router = inject(Router)
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
  getRole(){
    return this.authService.getUser()?.role;
  }

  logout(): void {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
      this.isAuthenticated = false;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleConfigMenu() {
    this.isConfigMenuOpen = !this.isConfigMenuOpen;
  }

  // Método para navegar a la página de contactos
  navigateToContacts() {
    this.router.navigate(['/applicant/contacts']);
  }

  // Método para navegar al perfil del usuario
  goToProfile() {
    this.router.navigate(['/applicant/profile']);
  }

  goToWorkApplicant() {
  this.router.navigate(['/applicant/job']);
  }
  goToWorkCompany() {
    this.router.navigate(['/company/job']);
  }


}
