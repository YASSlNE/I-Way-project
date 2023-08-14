import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../services/problem.service';



@Component({
  selector: 'app-script-library',
  templateUrl: './script-library.component.html',
  styleUrls: ['./script-library.component.css']
})
export class ScriptLibraryComponent implements OnInit{
  ngOnInit(): void {
    this.loadProblemsForUser();
  }
  constructor(private problemService : ProblemService){
  }
  problems : any = [
  ];

  onPostClicked(index: number) {
    this.problems[index].showChildPosts = !this.problems[index].showChildPosts;
  }

  loadProblemsForUser(){
    this.problemService.getAllProblems().subscribe({
      next:async (data) => {
        for(let i = 0; i < data.length; i++){
          await this.problemService.getUserByProblemId(data[i].id).subscribe({
            next: (user) => {
              this.problems.push({
                title: data[i].description+" "+data[i].id,
                solutions: data[i].solutions,
                username: user.username,
                showChildPosts: false
              })
            }});

        }
      }, error : (err) => {
      console.log(err);
    }
  }
    )

  }

  
}
