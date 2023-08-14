import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ProblemService } from '../../services/problem.service';
import { firstValueFrom } from 'rxjs';
import { AddScriptModalFormComponent } from '../add-script-modal-form/add-script-modal-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ModifyProblemModalFormComponent } from '../modify-problem-modal-form/modify-problem-modal-form.component';

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





  constructor(private problemService : ProblemService,
              private dialog : MatDialog) { }
  
  addSolution() {
    const dialogRef = this.dialog.open(AddScriptModalFormComponent, {
      height: '80%',
      width: '70%',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.problemService.addSolution(this.id, result).subscribe({
    //       next: (response) => {
    //         this.solutions = response.solutions;
    //       },
    //       error: (err) => {
    //         console.log(err);
    //       },
    //     });
    //   }
    // });

  }
  modifyProblem() {
    const dialogRef = this.dialog.open(ModifyProblemModalFormComponent, {
      height: '40%',
      width: '50%',
      data: {
        title: this.title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.problemService.modifyProblem(this.id, result).subscribe({
          next: (response) => {
            this.title = response.description;
            this.solutions = response.solutions;
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
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
