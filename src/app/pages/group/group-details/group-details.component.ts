import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.css'
})
export class GroupDetailsComponent {
  group: any;
  newPost = '';
  posts = [
    {
      author: 'Sarah Johnson',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      content: 'Just found this amazing resource for web designers!',
      time: '2 hours ago'
    },
    {
      author: 'Mike Chen',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      content: 'Would love to get feedback on my latest project.',
      time: '5 hours ago'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const groupId = this.route.snapshot.paramMap.get('id');
    // In a real app, you would fetch the group details from a service
    this.group = {
      id: groupId,
      name: 'Web Design Inspiration',
      description: 'Share and discover beautiful web design examples.',
      members: 850,
      image: 'https://picsum.photos/seed/design/800/400'
    };
  }

  createPost() {
    if (this.newPost.trim()) {
      this.posts.unshift({
        author: 'You',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
        content: this.newPost,
        time: 'Just now'
      });
      this.newPost = '';
    }
  }
  
}
