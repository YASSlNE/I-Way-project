import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ProblemService } from '../../services/problem.service';
import { firstValueFrom } from 'rxjs';
import { AddScriptModalFormComponent } from '../add-script-modal-form/add-script-modal-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ModifyProblemModalFormComponent } from '../modify-problem-modal-form/modify-problem-modal-form.component';
import { StorageService } from 'src/app/views/auth/services/storage.service';

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
  ],
  changeDetection: ChangeDetectionStrategy.Default, 

})
export class PostComponent implements OnInit{
  onSolutionDownvoted($event: number) {
    // Find the solution in the solutions array
    const solutionToUpdate = this.solutions.find((solution:any) => solution.id === $event);
    if (solutionToUpdate) {
      solutionToUpdate.score--; // Update the score
    }
}
  onSolutionUpvoted(solutionId: number) {
    // Find the solution in the solutions array
    const solutionToUpdate = this.solutions.find((solution:any) => solution.id === solutionId);
    if (solutionToUpdate) {
      solutionToUpdate.score++; // Update the score
    }
  }
  trackByFn(index: number, item: any): number {
    return item.id;
  }

  ngOnInit(): void {
    this.hasRightToModifyOrDelete  = this.storageService.getUser()["username"] == this.username;
  }
  constructor(private problemService : ProblemService,
              private dialog : MatDialog,
              private cdr : ChangeDetectorRef,
              private storageService: StorageService
              ) { }
  
  addSolution() {
    const dialogRef = this.dialog.open(AddScriptModalFormComponent, {
      height: '80%',
      width: '70%',
      data: {
        id : this.id
      }
    });

    dialogRef.componentInstance.solutionAdded.subscribe((solutionData: any) => {
        this.solutions.push(solutionData);
    });

    
    
    
  

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
    
      if (confirm('Are you sure you want to delete?')) {
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
    







  }
  @Input() title!: string;
  @Input() solutions: any[] = [];
  @Input() username!: string;
  @Input() id!: number;
  @Output() problemDeleted: EventEmitter<number> = new EventEmitter<number>();


  hasRightToModifyOrDelete : boolean = true;
  
  showChildPosts: boolean = false;

  async onPostClicked() {
    console.log("solutions===============-")
    console.log(this.solutions)
    this.showChildPosts = !this.showChildPosts;
  
  }
}
