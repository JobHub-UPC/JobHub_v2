import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  posts = [
    {
      userName: 'Sofia Davis',
      userHandle: '115 seguidores',
      userImage: 'assets/img/sofia.jpg',
      time: '4 días',
      title: 'Introducing our new product line!',
      content:
        'We are excited to share our latest innovations with you. Check out the details and let us know what you think!',
      postImage: 'assets/img/feed1.jpg',
      likes: 5,
      comments: 15,
      liked: false,
    },

    {
      userName: 'Oscar Lopez',
      userHandle: '205 seguidores',
      userImage: 'assets/img/oscar.jpg',
      time: '1 semana',
      title: 'Excited to share my latest project!',
      content:
        "'Ive been working hard on this and cant wait for you all to see it. Let me know what you think'",
      postImage: 'assets/img/feedOscar.jpg',
      likes: 5,
      comments: 15,
      liked: false,
    },

    {
      userName: 'Banco de crédito BCP',
      userHandle: '13.0613 seguidores',
      userImage: 'assets/img/bcp.jpg',
      time: '1 semana',
      content:
        "'Ive been working hard on this and cant wait for you all to see it. Let me know what you think'",
      postVideo: 'assets/video/bcp.mp4',
      likes: 5,
      comments: 15,
      liked: false,
    },
    // ... más posts aquí
  ];

  toggleLike(post: any): void {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1; // Incrementa o decrementa el número de "likes"
  }
}