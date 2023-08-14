import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../services/problem.service';
import { MatDialog } from '@angular/material/dialog';
import { ProblemFormModalComponent } from './problem-form-modal/problem-form-modal.component';
import { StorageService } from 'src/app/views/auth/services/storage.service';
@Component({
  selector: 'app-script-library',
  templateUrl: './script-library.component.html',
  styleUrls: ['./script-library.component.css']
})
export class ScriptLibraryComponent implements OnInit {
  openAddProblemModal() {
    const dialogRef = this.dialog.open(ProblemFormModalComponent, {
      height: '40%',
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.problemService.addProblem(result).subscribe({
          next: (data) => {

            console.log(data);
            this.problems.unshift({
              title: data.description + ' ' + data.id,
              solutions: data.solutions,
              username: this.storageService.getUser().username,
              showChildPosts: false
            });
          }, error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadProblemsForUser();
  }

  constructor(private storageService: StorageService, private problemService: ProblemService, private dialog: MatDialog) {}

  problems: any = [];

  onPostClicked(index: number) {
    this.problems[index].showChildPosts = !this.problems[index].showChildPosts;
  }

  async loadProblemsForUser() {
    try {
      const data = await this.problemService.getAllProblems().toPromise();
      
      const userPromises = data.map((problem: { id: number; }) =>
        this.problemService.getUserByProblemId(problem.id).toPromise()
      );
      
      const userResponses = await Promise.all(userPromises);
  
      for (let i = 0; i < data.length; i++) {
        const user = userResponses[i];
        const problem = data[i];
  
        this.problems.unshift({
          title: problem.description + ' ' + problem.id,
          solutions: problem.solutions,
          username: user.username,
          showChildPosts: false
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  
}
