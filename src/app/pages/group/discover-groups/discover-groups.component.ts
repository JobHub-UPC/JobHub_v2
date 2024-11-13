import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../../../core/services/group.service';
import { AuthService } from '../../../core/services/auth.service';
import { groupResponse } from '../../../shared/models/group-response.model';

@Component({
  selector: 'app-discover-groups',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discover-groups.component.html',
  styleUrl: './discover-groups.component.css'
})
export class DiscoverGroupsComponent implements OnInit {
  discoverGroups: groupResponse[] = []; // Grupos para descubrir
  userGroups: groupResponse[] = []; // Grupos a los que el usuario ya se ha unido
  @Output() joinGroup = new EventEmitter<groupResponse>();

  constructor(
    private router: Router,
    private groupService: GroupService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserGroups(); // Cargar los grupos del usuario para excluirlos de Discover
    this.loadGroups(); // Cargar todos los grupos para descubrir
  }

  loadUserGroups(): void {
    const userId = this.authService.getUser()?.id; // Obtener el ID del usuario autenticado
    if (userId) {
      this.groupService.getUserGroups(userId).subscribe({
        next: (groups) => this.userGroups = groups, // Guardar los grupos del usuario
        error: (err) => console.error('Error al cargar los grupos del usuario:', err),
      });
    } else {
      console.error('No se pudo obtener el ID del usuario.');
    }
  }

  loadGroups(): void {
    this.groupService.getGroups().subscribe({
      next: (groups) => {
        // Excluir los grupos a los que el usuario ya se ha unido
        this.discoverGroups = groups.filter(
          (group) => !this.userGroups.some((userGroup) => userGroup.id === group.id)
        );
      },
      error: (err) => console.error('Error al cargar los grupos:', err)
    });
  }

  onJoinGroup(group: groupResponse): void {
    if (group.isPrivate) {
      // Si el grupo es privado, cambiamos el estado a pendiente
      group.isPending = true;
    } else {
      // Emitimos el evento para unirse al grupo si es público
      this.joinGroup.emit(group);
    }
  }

  goToGroupDetails(groupId: number): void {
    this.router.navigate(['/group-details', groupId]);
  }
}