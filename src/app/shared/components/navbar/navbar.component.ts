import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
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

  logout(): void {
      this.authService.logout();
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

  goToWork() {
    this.router.navigate(['/applicant/work']);
  }

}
