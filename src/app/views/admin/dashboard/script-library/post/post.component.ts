import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  addSolution() {
  }
  modifyProblem() {
  }
  deleteProblem() {
    
      // if (confirm('Are you sure you want to delete?')) {
      //   this.authService.logout().subscribe({
      //     next: () => {
      //       this.storageService.clean();
      //       console.log('User logged out successfully')
      //       window.location.reload();
      //       this.router.navigate(['/auth/login']);
      //     },
      //     error: err => {
      //       console.log(err);
      //     }
      //   });
      // }
    






    this.problemService.deleteProblem(this.id).subscribe(
      response=>{
        console.log(response);
        this.problemDeleted.emit(this.id);
      },
      error =>{
        console.error(error)
      }
    );
  }
  @Input() title!: string;
  @Input() solutions!: string[]; // Use an appropriate type for your child post data
  @Input() username!: string;
  @Input() id!: number;
  @Output() problemDeleted: EventEmitter<number> = new EventEmitter<number>();

  showChildPosts: boolean = false;

  async onPostClicked() {
    console.log("solutions===============-")
    console.log(this.solutions)
    this.showChildPosts = !this.showChildPosts;
  
  }
}
