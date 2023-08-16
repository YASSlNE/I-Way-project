import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
} from '@materia-ui/ngx-monaco-editor';
import { timeout } from 'rxjs';
import { SolutionService } from '../../services/solution.service';

@Component({
  selector: 'app-child-post',
  templateUrl: './child-post.component.html',
  styleUrls: ['./child-post.component.css']
})
export class ChildPostComponent implements AfterViewInit{

  solutionCode: any;
  showTabs = false;
  solutionDescription: any;
  id : any;
  upvotingUsers : any = [];
  currentUserVoted : boolean = false;


//   thumbsUp() {
    
//     let upvotingUser = JSON.parse(localStorage.getItem('auth-user') || '{}').id; 
//     let upvotingUserString = JSON.stringify(upvotingUser);
//     if ((!this.upvotingUsers.some((user: any) => JSON.stringify(user.id) === upvotingUserString)) && !this.currentUserVoted) {
//       this.currentUserVoted = true;
//       this.upvotingUsers.push(upvotingUser);
//       this.solutionService.upVoteSolution(this.id).subscribe(
//         data => {
//           console.log(data);
//         },
//         err => {
//           console.log(err);
//         }
//       );

//     this.score += 1;
//   }
//   else{
//     alert("You have already upvoted this solution")
//   }
// }
@Output() solutionUpvoted: EventEmitter<number> = new EventEmitter<number>();
@Output() solutionDownVoted: EventEmitter<number> = new EventEmitter<number>();
async thumbsUp() {
  if (!this.currentUserVoted) {
    this.currentUserVoted = true;
    await this.solutionService.upVoteSolution(this.id).subscribe(
      data => {
        console.log(data);
        this.solutionUpvoted.emit(this.id);
      },
      err => {
        console.log(err);
      }
    );
  this.score ++;
  }
  else if(this.currentUserVoted){
    this.currentUserVoted = false;
    await this.solutionService.downVoteSolution(this.id).subscribe(
      data => {
        console.log(data);
        this.solutionDownVoted.emit(this.id);
      },
      err => {
        console.log(err);
      }
    );
    this.score--;
  }

}
  language: any;
  score! : number;

  constructor(private cdr: ChangeDetectorRef,
              private solutionService: SolutionService) {
              }


  ngAfterViewInit(): void {

    this.id = this.content['id'];
    this.language = this.content['language'];
    this.solutionCode = this.content['code'];
    this.solutionDescription = this.content['description'];
    this.score = this.content['score'];
    this.upvotingUsers = this.content['upvotingUsers'];
    if(this.upvotingUsers != null)
      this.currentUserVoted = this.upvotingUsers.some((user: any) => JSON.stringify(user.id) === JSON.stringify(JSON.parse(localStorage.getItem('auth-user') || '{}').id));

    setTimeout(() => {
      this.onLanguageSelected(this.language);
      this.cdr.detectChanges(); // Mark the view for check
    }, 2000);
  }

  loadMonacoLanguage(language: string) {
    const model = this.monacoComponent.editor.getModel();
    if (model) {
      monaco.editor.setModelLanguage(model, language);
    }
  }

  onLanguageSelected(selectedLanguage: string) {
    console.log('Selected language:', selectedLanguage);  
    this.loadMonacoLanguage(selectedLanguage);
    this.editorOptions.language = selectedLanguage;
    this.solutionCode = this.content['code'];
    this.cdr.markForCheck();
  }

  @Input() content!: any;

  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent!: MonacoEditorComponent;

  activeTab: any = "code";
  editorOptions: MonacoEditorConstructionOptions =  {
    language: 'html',
    theme: 'vs-dark',
    automaticLayout: true,
    readOnly: true,
  };


  

}
