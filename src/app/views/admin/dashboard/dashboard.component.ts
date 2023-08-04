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
  constructor(private monacoLoader: MonacoEditorLoaderService) {} // Inject MonacoEditorLoaderService

  editorOptions: MonacoEditorConstructionOptions = {
    language: 'html',
    theme: 'vs-dark',
    automaticLayout: true,
    
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
          <form id="form" action="#" class="space-y-8">
            ${this.elementsArray}
          </form>
        `;
        break;
      case 'typescript':
        this.generatedCode = `
export class FormComponent {
  formElements: any[] = [];
  
  constructor() {
    this.formElements = [
      {
                  type: "input",
                  name: "name",
                  validator: "",
                },
              ];
            }
          }
        `;
        break;
      case 'css':
        this.generatedCode = `
          form {
            width: 500px;
            margin: 0 auto;
          }
  
          label {
            font-size: 16px;
            margin-bottom: 10px;
          }
  
          input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
          }
        `;
        break;
      case 'spec':
        this.generatedCode = `
          import { Component } from '@angular/core';
          import { FormBuilder } from '@angular/forms';
  
          @Component({
            selector: 'app-form',
            templateUrl: './form.component.html',
            styleUrls: ['./form.component.css']
          })
          export class FormComponent {
            formElements: any[] = [];
  
            constructor(private fb: FormBuilder) {
              this.formElements = [
                {
                  type: "input",
                  name: "name",
                  validator: "",
                },
              ];
            }
  
            onSubmit() {
              // Do something with the form data
            }
          }
        `;
        break;
    }
  }

  generateCode() {
    this.loading = true;

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
      <form id="form" action="#" class="space-y-8">
        ${this.elementsArray}
      </form>
    `;

    this.generatedCode = code;
    this.loading = false; // Set the loading state to false when code generation is complete
  }
}
