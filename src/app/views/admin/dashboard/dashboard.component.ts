import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
} from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private monacoLoader: MonacoEditorLoaderService) {}

  editorOptions: MonacoEditorConstructionOptions = {
    language: 'html',
    theme: 'vs-dark',
    automaticLayout: true,
    readOnly: true,
  };

  editorOverrideOptions: monaco.editor.IEditorOverrideServices = {
    // Disable suggestions
    suggest: {
      quickSuggestions: false,
      suggestions: false,
    },
    // Disable syntax validation
    diagnostics: {
      validate: false,
    },
  };


  toggleWhiteSpace: boolean = false;
  componentSelectorName : string = '';
  componentClassName : string = '';
  loading: boolean = false;
  elementsArray = '';
  generatedCode: string = '';
  componentName: string = '';
  selectedLanguage: string = 'javascript';
  formElements: any[] = [];
  elementTypes: any[] = [
    { name: 'Input', value: 'input' },
    { name: 'Select', value: 'select' },
    { name: 'Text area', value: 'textarea' },
  ];

  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent!: MonacoEditorComponent;

  ngOnInit() {}


  transformComponentName(componentName: string) {
    const componentWords = componentName.split(' ');
    const componentSelectorName = componentWords.join('-').toLowerCase();
    const componentClassName = componentWords
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

      this.componentClassName = componentClassName;
      this.componentSelectorName = componentSelectorName;
  }


  addFormElement() {
    this.formElements.push({
      type: 'input',
      name: '',
      validator: '',
    });
  }

  removeFormElement(index: number) {
    this.formElements.splice(index, 1);
  }

  switchEditorLanguage(language: string) {








    this.selectedLanguage = language;
    switch (language) {
      case 'html':
        this.editorOptions.language = 'html';
        break;
      case 'typescript':
        this.editorOptions.language = 'typescript';
        break;
      case 'css':
        this.editorOptions.language = 'css';
        break;
      case 'spec':
        this.editorOptions.language = 'typescript';
        break;
    }

    // Dynamically load the required monaco language
    this.monacoLoader.isMonacoLoaded$.subscribe((isLoaded) => {
      if (isLoaded) {
        const model = this.monacoComponent.editor.getModel();
        if (model && this.editorOptions.language) {
          monaco.editor.setModelLanguage(model, this.editorOptions.language);
        }
      }
    });

    switch (language) {
      case 'html':
        this.generatedCode = `
<!-- ... ${this.componentSelectorName}.html ... -->


<form id="form" action="#" class="space-y-8">
  ${this.elementsArray}
</form>
        `;
        break;
      case 'typescript':
        this.generatedCode = `
//${this.componentSelectorName}.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-${this.componentSelectorName}',
  templateUrl: './${this.componentSelectorName}.component.html',
  styleUrls: ['./${this.componentSelectorName}.component.css']
})
export class ${this.componentClassName}Component {

}

        `;
        break;
      case 'css':
        this.generatedCode = `
/* ${this.componentSelectorName}.component.css */
        `;
        break;
      case 'spec':
        this.generatedCode = `
//${this.componentSelectorName}.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ${this.componentClassName}Component } from './${this.componentSelectorName}.component';

describe('${this.componentClassName}Component', () => {
  let component: ${this.componentClassName}Component;
  let fixture: ComponentFixture<${this.componentClassName}Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [${this.componentClassName}Component]
    });
    fixture = TestBed.createComponent(${this.componentClassName}Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});                             

        `;
        break;
    }
  }

  generateCode() {
    this.elementsArray = '';
    this.toggleWhiteSpace = true;


    this.loading = true;


    setTimeout(()=>{

      this.transformComponentName(this.componentName);


      let inputElement = `
  <div>
    <label for="{elementName}" class="block mb-2 text-sm font-medium text-gray-900">
      {elementName}
    </label>
    <input type="text" id="{elementName}" name="{elementName}"
      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
  </div>
      `;



      let selectElement = `
      <div
      id="lang"
      class="ml-8 flex flex-col"
      style="margin-right: 125px">
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="language"
        >Language</label
      >
      <select
        id="language"
        style="width: 150px"
        class="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
        [(ngModel)]="selectedLanguage"
      >
        <option value="option1">option1</option>
        <option value="option2">option2</option>
        <option value="option3">option3</option>
      </select>
    </div>
    `;
  
      for (let element of this.formElements) {
        switch (element.type) {
          case 'input':
            let elementCode = inputElement.replace(
              /{elementName}/g,
              element.name
            );
            this.elementsArray += elementCode; // Append the generated code to the elementsArray
            break;
          // Add more cases for other types of form elements if needed
        }
      }
  
      let code = `
<!-- ... ${this.componentSelectorName}.html ... -->


<form id="form" action="#" class="space-y-8">
  ${this.elementsArray}
</form>
      `;
  
      this.generatedCode = code;
      this.loading = false; // Set the loading state to false when code generation is complete
  
    }, 1000);
  

  }

  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.generatedCode);
      console.log('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  }
  
  


}
