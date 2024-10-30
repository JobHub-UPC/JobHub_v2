import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ProfileBodyComponent } from '../profile-body/profile-body.component';
import { FriendsSuggestComponent } from '../friends-suggest/friends-suggest.component';

@Component({
  selector: 'app-profile-layout',
  standalone: true,
  imports: [NavbarComponent, ProfileBodyComponent, FriendsSuggestComponent],
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Añadir esto aquí
})
export class ProfileLayoutComponent {}
