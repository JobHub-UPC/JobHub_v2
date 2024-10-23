import { Component } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink, RouterOutlet, PostInputComponent, PostComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeComponent {

}
