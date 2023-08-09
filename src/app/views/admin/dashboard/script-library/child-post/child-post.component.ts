import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-post',
  templateUrl: './child-post.component.html',
  styleUrls: ['./child-post.component.css']
})
export class ChildPostComponent {
  @Input() content!: string;
}
