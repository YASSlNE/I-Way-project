import { Component, Input, ViewChild } from '@angular/core';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
} from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: 'app-child-post',
  templateUrl: './child-post.component.html',
  styleUrls: ['./child-post.component.css']
})
export class ChildPostComponent {
  @Input() content!: string;

  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent!: MonacoEditorComponent;

  activeTab: any = "solutions";
  editorOptions: MonacoEditorConstructionOptions =  {
    language: 'html',
    theme: 'vs-dark',
    automaticLayout: true,
    readOnly: true,
  };

  solutionCode: any = '<h1>Solution</h1>';
  showTabs = false;

  toggleTabs() {
    this.showTabs = !this.showTabs;
  }


  

}
