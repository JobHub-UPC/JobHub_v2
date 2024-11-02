import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discover-groups',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discover-groups.component.html',
  styleUrl: './discover-groups.component.css'
})
export class DiscoverGroupsComponent {
  @Input() discoverGroups!: any[];
  @Output() joinGroup = new EventEmitter<any>();

  constructor(private router: Router) {}

  goToGroupDetails(groupId: number): void {
    // Navigate to the group details page using the router
    this.router.navigate(['/group-details', groupId]);
  }
}
