import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
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
export class ChildPostComponent implements AfterViewInit{
  language: any;


  constructor(private cdr: ChangeDetectorRef) {}


  ngAfterViewInit(): void {
    // This lifecycle hook ensures that the view (including child components) is fully initialized

    this.language = this.content['language'];
    this.solutionCode = this.content['code'];
    this.solutionDescription = this.content['description'];

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

  solutionCode: any;
  showTabs = false;
  solutionDescription: any;



  

}
