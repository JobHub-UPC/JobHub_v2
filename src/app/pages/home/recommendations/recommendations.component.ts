import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
})
export class RecommendationsComponent {
  title: string = 'You may be interested';
  viewAllText: string = 'See all similar pages';

  recommendations = [
    {
      name: 'Figma',
      category: 'Company • Design',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
      isFollowing: false,
    },
    {
      name: 'Google',
      category: 'Company • Internet',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
      isFollowing: false,
    },
    {
      name: 'Notion',
      category: 'Company • Software',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
      isFollowing: true,
    },
  ];

  toggleFollow(item: any): void {
    item.isFollowing = !item.isFollowing;
  }
}