import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() childPosts!: any[]; // Use an appropriate type for your child post data
  @Input() showChildPosts: boolean = false;
  @Output() postClicked: EventEmitter<void> = new EventEmitter<void>();

  onPostClicked() {
    this.showChildPosts = !this.showChildPosts;
    this.postClicked.emit();
  }
}
