import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-groups',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-groups.component.html',
  styleUrl: './my-groups.component.css'
})
export class MyGroupsComponent {
  @Input() myGroups!: any[];
  @Output() leaveGroup = new EventEmitter<any>();

  constructor(private router: Router) {}

  goToGroupDetails(groupId: number): void {
    // Navigate to the group details page using the router
    this.router.navigate(['/group-details', groupId]);
  }
  
}
