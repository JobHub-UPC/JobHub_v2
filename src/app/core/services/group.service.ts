import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groups = [
    { id: '1', name: 'Web Design Inspiration', description: 'Beautiful web designs.', members: 850, image: 'https://acortar.link/hD2AWH' },
    { id: '2', name: 'Frontend Masters', description: 'Advanced frontend development.', members: 1500, image: 'https://acortar.link/iI6EN9' },
    // Otros grupos...
  ];

  getGroupById(id: string) {
    return this.groups.find(group => group.id === id);
  }
}
