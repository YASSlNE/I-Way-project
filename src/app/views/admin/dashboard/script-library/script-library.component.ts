import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProblemService } from '../services/problem.service';
import { StorageService } from 'src/app/views/auth/services/storage.service';
import { ProblemFormModalComponent } from './problem-form-modal/problem-form-modal.component';

@Component({
  selector: 'app-script-library',
  templateUrl: './script-library.component.html',
  styleUrls: ['./script-library.component.css'],
})
export class ScriptLibraryComponent implements OnInit {
  problems: any[] = [];

  constructor(
    private storageService: StorageService,
    private problemService: ProblemService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProblemsForUser();
  }

  // Open the "Add Problem" modal
  openAddProblemModal() {
    const dialogRef = this.dialog.open(ProblemFormModalComponent, {
      height: '40%',
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addProblem(result);
      }
    });
  }

  // Add a new problem to the problems array
  addProblem(data: any) {
    this.problemService.addProblem(data).subscribe({
      next: (response) => {
        const newProblem = {
          id: response.id,
          title: response.description,
          solutions: response.solutions,
          username: this.storageService.getUser().username,
          showChildPosts: false,
        };
        this.problems.unshift(newProblem);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Toggle the display of child posts
  onPostClicked(index: number) {
    this.problems[index].showChildPosts = !this.problems[index].showChildPosts;
  }

  async loadProblemsForUser() {
    try {
      const data = await this.problemService.getAllProblems().toPromise();
      const userPromises = data.map((problem: { id: number }) =>
        this.problemService.getUserByProblemId(problem.id).toPromise()
      );
      const userResponses = await Promise.all(userPromises);

      for (let i = 0; i < data.length; i++) {
        const user = userResponses[i];
        const problem = data[i];

        const newProblem = {
          id: problem.id,
          title: problem.description,
          solutions: problem.solutions,
          username: user.username,
          showChildPosts: false,
        };
        this.problems.unshift(newProblem);
      }
    } catch (error) {
      console.log(error);
    }
  }

  onProblemDeleted(problemId: number) {
    // Find the index of the deleted problem in the problems array
    const index = this.problems.findIndex(problem => problem.id === problemId);
    
    if (index !== -1) {
      this.problems.splice(index, 1); // Remove the deleted problem from the array
    }
  }

}
