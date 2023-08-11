import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(150))
    ])
  ]

})
export class PostComponent {

  @Input() title!: string;
  @Input() solutions!: string[]; // Use an appropriate type for your child post data
  showChildPosts: boolean = false;

  onPostClicked() {
    this.showChildPosts = !this.showChildPosts;
  }
}
