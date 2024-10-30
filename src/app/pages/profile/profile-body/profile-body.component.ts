import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-body.component.html',
  styleUrl: './profile-body.component.css'
})
export class ProfileBodyComponent {

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

    description = ['Soy Carla Rodriguez, ceo de BCP, comprometida y apasionada por la tecnología. Siempre estoy en la búsqueda de nuevos desafíos y oportunidades de aprendizaje para expandir mis conocimientos y habilidades. Mi interés principal radica en los campos de la ciencia de datos, la inteligencia artificial y el desarrollo web. Estoy dedicada a profundizar en estos ámbitos, aplicando tanto mis conocimientos teóricos como mis habilidades prácticas en proyectos innovadores y colaborativos.Me motiva la idea de usar la tecnología para resolver problemas complejos y mejorar la vida de las personas. Siempre estoy abierta a conectar con otros profesionales y aprender de diversas experiencias en la industria tecnológica.'];

  // Data for education items
  educationItems = [
    {
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/UPC_logo_transparente.png',
      institution: 'Universidad Peruana de Ciencias Aplicadas',
      fieldOfStudy: 'Ciencias de la computación',
      startDate: 'mar. 2022',
      additionalInfo: ['Ciencias de la computación']
    },
    {
      logo: 'https://www.icpna.edu.pe/static/img/logo.svg',
      institution: 'ICPNA',
      fieldOfStudy: 'Enseñanza de inglés como lengua extranjera',
      startDate: 'sept. 2019 - mar. 2023',
      additionalInfo: ['Inglés'],
      certificate: {
        thumbnail: 'https://d20ohkaloyme4g.cloudfront.net/img/document_thumbnails/455b911b128543e7d9dc67d9d3225c45/thumb_1200_1528.png',
        title: 'Certificado',
        description: 'Certificado de estudios'
      }
    }
  ];
}
