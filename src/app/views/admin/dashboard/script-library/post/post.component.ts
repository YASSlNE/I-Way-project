import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ProblemService } from '../../services/problem.service';
import { firstValueFrom } from 'rxjs';

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

  constructor(private problemService : ProblemService){
  }

  @Input() title!: string;
  @Input() solutions!: string[]; // Use an appropriate type for your child post data
  showChildPosts: boolean = false;

  async onPostClicked() {
    this.showChildPosts = !this.showChildPosts;
    this.problemService.getAllProblemsByUser().subscribe({
      next: (data) => {
        console.log(data);
      }, error : (err) => {
      console.log(err);
    }
  }
    )
  
  
  }
}
