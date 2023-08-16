import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProblemService } from '../services/problem.service';
import { StorageService } from 'src/app/views/auth/services/storage.service';
import { ProblemFormModalComponent } from './problem-form-modal/problem-form-modal.component';
import { SolutionService } from '../services/solution.service';

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
    private dialog: MatDialog,
    private solutionService: SolutionService
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
          solutions: [],
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
        Promise.all([
          this.problemService.getUserByProblemId(problem.id).toPromise(),
          this.solutionService.getSolutionsByProblem(problem.id).toPromise()
        ])
      );
      const userAndSolutionsResponses = await Promise.all(userPromises);
  
      for (let i = 0; i < data.length; i++) {
        const [user, solutions] = userAndSolutionsResponses[i];
        const problem = data[i];
        const newSolutions = this.sortSolutions(solutions);
        const newProblem = {
          id: problem.id,
          title: problem.description,
          solutions: solutions,
          username: user.username,
          showChildPosts: false,
        };
        this.problems.unshift(newProblem);
      }
    } catch (error) {
      console.log(error);
    }
  }

  sortSolutions(solutions : any){
    solutions.sort((a: any, b: any) => {
      return b.score - a.score;
    });
  }
  

  onProblemDeleted(problemId: number) {
    // Find the index of the deleted problem in the problems array
    const index = this.problems.findIndex(problem => problem.id === problemId);
    
    if (index !== -1) {
      this.problems.splice(index, 1); // Remove the deleted problem from the array
    }
  }

}
