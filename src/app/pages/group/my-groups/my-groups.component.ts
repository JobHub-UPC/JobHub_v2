import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../../../core/services/group.service';
import { AuthService } from '../../../core/services/auth.service';
import { groupResponse } from '../../../shared/models/group-response.model';

@Component({
  selector: 'app-my-groups',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-groups.component.html',
  styleUrl: './my-groups.component.css'
})
export class MyGroupsComponent implements OnInit {
  myGroups: groupResponse[] = [];
  @Output() leaveGroup = new EventEmitter<groupResponse>();

  constructor(
    private router: Router,
    private groupService: GroupService,
    private authService: AuthService // Inyectamos el servicio de autenticación
  ) {}

  ngOnInit(): void {
    this.loadUserGroups(); // Cargar los grupos al inicializar el componente
  }

  loadUserGroups(): void {
    const userId = this.authService.getUser()?.id; // Obtenemos el userId del usuario autenticado
    if (userId) {
      this.groupService.getUserGroups(userId).subscribe({
        next: (groups) => (this.myGroups = groups),
        error: (err) => console.error('Error al cargar los grupos del usuario:', err),
      });
    } else {
      console.error('No se pudo obtener el ID del usuario.');
    }
  }

  goToGroupDetails(groupId: number): void {
    this.router.navigate(['/group-details', groupId]);
  }

  onLeaveGroup(group: groupResponse): void {
    this.leaveGroup.emit(group);
  }
}