import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PersonComponent } from '../person/person.component';

@Component({
  selector: 'app-contacts-layout',
  standalone: true,
  imports: [ PersonComponent],
  templateUrl: './contacts-layout.component.html',
  styleUrl: './contacts-layout.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Añadir esto aquí
})
export class ContactsLayoutComponent {

}