import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() title!: string;
  @Input() childPosts!: string[]; // Use an appropriate type for your child post data
  showChildPosts: boolean = false;

  onPostClicked() {
    this.showChildPosts = !this.showChildPosts;
  }
}
