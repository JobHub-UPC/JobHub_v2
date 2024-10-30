import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css'],
})
export class ProfileCardComponent {
  // Paths for images
  coverImage = 'assets/img/bcp.jpg';
  profileImage = 'assets/img/carla.jpg';
  universityLogo = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/UPC_logo_transparente.png';

  // Profile data
  name = 'Carla Rodriguez';
  title = 'Computer science student';
  location = 'Perú';
  email = 'juana@gmail.com';
  phone = '9784562163';
  contactsCount = 7;
  universityName = 'Universidad Peruana de Ciencias Aplicadas';
}
