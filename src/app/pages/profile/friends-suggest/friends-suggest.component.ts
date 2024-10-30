import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-friends-suggest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './friends-suggest.component.html',
  styleUrl: './friends-suggest.component.css'
})
export class FriendsSuggestComponent {
  title: string = 'You may be interested';
  viewAllText: string = 'See more similar contacts';

  recommendations = [
    {
      name: 'Jeff Bezos',
      category: 'CEO Amazon • Company',
      image:
        'https://www.clarin.com/img/2023/01/10/R65SQUahc_600x600__1.jpg',
      isFollowing: false,
    },
    {
      name: 'Bill Gates',
      category: 'CEO Microsoft • Tech',
      image:
        'https://media.licdn.com/dms/image/v2/D5603AQHv6LsdiUg1kw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1695167344576?e=2147483647&v=beta&t=vB03Mumg9vqYiwMCmT3pwjcWyTO5TZugDqammxCtbyY',
      isFollowing: false,
    },
    {
      name: 'Henry Mendoza',
      category: 'CEO HampCode • Software',
      image:
        'https://avatars.githubusercontent.com/u/10110322?v=4',
      isFollowing: true,
    },
    {
      name: 'Michael Jackson',
      category: 'King Pop • Singer',
      image:
        'https://www.hola.com/horizon/square/1990f17f0318-tc-michael-jackson2-z.jpg',
      isFollowing: true,
    },
    {
      name: 'Julio Velarde',
      category: 'BCRP • Economista',
      image:
        'https://www.bcrp.gob.pe/images/sobre-el-bcrp/directorio/2021/julio-velarde.jpg',
      isFollowing: true,
    },
  ];

  toggleFollow(item: any): void {
    item.isFollowing = !item.isFollowing;
  }

}
