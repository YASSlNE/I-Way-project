import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
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


  thumbsUp() {
    let upvotingUser = JSON.parse(localStorage.getItem('auth-user') || '{}').id; 
    let upvotingUserString = JSON.stringify(upvotingUser);
    if (!this.upvotingUsers.some((user: any) => JSON.stringify(user.id) === upvotingUserString)) {
      // User is not in the upvotingUsers list, add them
      this.upvotingUsers.push(upvotingUser);
      this.solutionService.upVoteSolution(this.id).subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );

    this.score += 1;
  }
  else{
    alert("You have already upvoted this solution")
  }
}
  language: any;
  score! : number;

  constructor(private cdr: ChangeDetectorRef,
              private solutionService: SolutionService) {
              }


  ngAfterViewInit(): void {
    // This lifecycle hook ensures that the view (including child components) is fully initialized
    this.id = this.content['id'];
    this.language = this.content['language'];
    this.solutionCode = this.content['code'];
    this.solutionDescription = this.content['description'];
    this.score = this.content['score'];
    this.upvotingUsers = this.content['upvotingUsers'];

    // Call onLanguageSelected here, after the view is fully initialized
    // Use a timeout to ensure the Monaco Editor has time to fully load
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
