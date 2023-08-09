import { Component } from '@angular/core';

@Component({
  selector: 'app-script-library',
  templateUrl: './script-library.component.html',
  styleUrls: ['./script-library.component.css']
})
export class ScriptLibraryComponent {
  posts = [
    {
      title: 'Example Post 1',
      childPosts: [
        { content: 'Child Post 1-1' },
        { content: 'Child Post 1-2' }
      ],
      showChildPosts: false
    },
    {
      title: 'Example Post 2',
      childPosts: [
        { content: 'Child Post 2-1' },
        { content: 'Child Post 2-2' }
      ],
      showChildPosts: false
    }
  ];

  onPostClicked(index: number) {
    this.posts[index].showChildPosts = !this.posts[index].showChildPosts;
  }
}
