import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";


import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
} from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {



  loading: boolean = false;
  
  generatedCode: string = '';
  componentName: string = '';
  selectedLanguage: string = 'javascript';
  formElements: any[] = [];
  elementTypes: any[] = [{name:"Input", value:"input"}, {name: "Select", value: "select"}, {name : "Text area", value: "textarea"}];
 


  
  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent!: MonacoEditorComponent;
  editorOptions: MonacoEditorConstructionOptions = {
    language: 'html', // java, javascript, python, csharp, html, markdown, ruby
    theme: 'vs-dark', // vs, vs-dark, hc-black
    automaticLayout: true,
  };


  ngOnInit() {}

  addFormElement() {
    this.formElements.push({
      type: "input",
      name: "",
      validator: "",
    });
  }

  removeFormElement(index: number) {
    this.formElements.splice(index, 1);
  }



  switchEditorLanguage(language: string) {
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
      default:
        this.editorOptions.language = 'html';
    }
    this.generateCode();
  }


  generateCode() {

    this.loading = true;

    let elementsArray = "";
  
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
        case "input":
          let elementCode = inputElement.replace(/{elementName}/g, element.name);
          elementsArray += elementCode; // Append the generated code to the elementsArray
          break;
        // Add more cases for other types of form elements if needed
      }
    }
  
    // let code = `
    //   <form id="form" action="#" class="space-y-8">
    //     ${elementsArray}
    //   </form>`;

      let code = `
      <form id="form" action="#" class="space-y-8">
        ${elementsArray}
      </form>`;

      setTimeout(() => {
        
        this.generatedCode = code;
        this.loading = false; // Set the loading state to false when code generation is complete
      }, 1000);
    }
    
    
  
  


}


