import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent {
  contacts = [
    {
      img: 'https://avatars.githubusercontent.com/u/10110322?v=4',
      name: 'Henry Mendoza',
      charge: 'Ceo de HampCode',
      description:
        'Fundador con Ideales de uno las mejores canales de yt del Perú',
    },
    {
      img: 'https://www.bcrp.gob.pe/images/sobre-el-bcrp/directorio/2021/julio-velarde.jpg',
      name: 'Julio Velarde',
      charge: 'Presidente del BCRP',
      description:
        'Julio Velarde es Presidente del Directorio del Banco Central de Reserva del Perú desde octubre de 2006.',
    },
    {
      img: 'https://pbs.twimg.com/profile_images/1333036038814621696/1nQIzf9M_400x400.jpg',
      name: 'Alexander Larga',
      charge: 'Ceo de UPC',
      description:
        'Fundador con Ideales de unas las mejores universidades del Perú',
    },
    {
      img: 'https://upload.wikimedia.org/wikipedia/commons/7/75/220624_방탄소년단_뷔%281%29.jpg',
      name: 'Kin tajiun',
      charge: 'Cantante',
      description:
        'Feliz cumpleaños tajiun',
    },
    {
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      name: 'Alexander Larga',
      charge: 'Ceo de UPC',
      description:
        'Fundador con Ideales de unas las mejores universidades del Perú',
    },
    {
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      name: 'Alexander Larga',
      charge: 'Ceo de UPC',
      description:
        'Fundador con Ideales de unas las mejores universidades del Perú',
    },
  ];

}
