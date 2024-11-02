import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MyGroupsComponent } from '../my-groups/my-groups.component';
import { DiscoverGroupsComponent } from '../discover-groups/discover-groups.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-layout',
  standalone: true,
  imports: [CommonModule, MyGroupsComponent, DiscoverGroupsComponent, NavbarComponent],
  templateUrl: './group-layout.component.html',
  styleUrl: './group-layout.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Añadir esto aquí
})
export class GroupLayoutComponent {
  
  constructor(private router: Router) {}
  
  myGroups = [
    { name: 'Web Design Inspiration', description: 'Share and discover beautiful web design examples.', members: 850, image: 'https://acortar.link/hD2AWH', joined: true },
    { name: 'Frontend Masters', description: 'Advanced frontend development techniques and best practices.', members: 1500, image: 'https://acortar.link/iI6EN9', joined: true }
  ];

  discoverGroups = [
    { name: 'Angular Developers', description: 'A community for Angular developers to share knowledge and experiences.', members: 1200, image: 'https://acortar.link/jpwNEM', joined: false },
    { name: 'Tech Startups Network', description: 'Connect with other startup founders and developers.', members: 3000, image: 'https://miro.medium.com/v2/resize:fit:1000/0*u-zoQfMGy1ySZGK1.jpg', joined: false },
    { name: 'UI/UX Community', description: 'Discuss latest trends in UI/UX design and user experience.', members: 2200, image: 'https://www.prosperitydigital.es//storage/information-pages/June2022/UX-UI%20Visualisation1.png', joined: false }
  ];

    // Método para navegar a los detalles del grupo
    goToGroupDetails(groupId: string) {
      this.router.navigate(['/groups', groupId]);
    }

  toggleJoin(group: any) {
    group.joined = !group.joined;
    group.members += group.joined ? 1 : -1;

    if (group.joined) {
      this.discoverGroups = this.discoverGroups.filter(g => g !== group);
      this.myGroups.push(group);
    } else {
      this.myGroups = this.myGroups.filter(g => g !== group);
      this.discoverGroups.push(group);
    }

    // Sort both arrays by name
    this.myGroups.sort((a, b) => a.name.localeCompare(b.name));
    this.discoverGroups.sort((a, b) => a.name.localeCompare(b.name));
  }

}
