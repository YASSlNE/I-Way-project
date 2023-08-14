import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
} from '@materia-ui/ngx-monaco-editor';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-child-post',
  templateUrl: './child-post.component.html',
  styleUrls: ['./child-post.component.css']
})
export class ChildPostComponent implements OnInit{


  ngOnInit(): void {
    this.solutionCode = this.content["code"];
    this.solutionDescription = this.content["description"]
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

  solutionCode: any;
  showTabs = false;
  solutionDescription: any;



  

}
