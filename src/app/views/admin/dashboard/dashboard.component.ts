import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
// import arabicFile from '../../../../assets/countries/arabic.json';
// import frenchFile from '../../../../assets/countries/french.json';
// import englishFile from '../../../../assets/countries/english.json';
import { HttpClient } from '@angular/common/http';
import {englishCountries} from '../../../../assets/countries/english';
import {arabicCountries} from '../../../../assets/countries/arabic';
import {frenchCountries} from '../../../../assets/countries/french';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
} from '@materia-ui/ngx-monaco-editor';
import { CountrySelectDialogComponent } from './countryselectdialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  countryAPI: any = false;


  
  constructor(private monacoLoader: MonacoEditorLoaderService, private http: HttpClient, private dialog: MatDialog) {}

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

  elementValues: { 
    [elementName: string]: string 
  } = {};

  
  countryValuesLanguage : string = 'english';
  
  toggleWhiteSpace: boolean = false;
  componentSelectorName : string = '';
  componentClassName : string = '';
  loading: boolean = false;
  elementsArray = '';
  generatedCode: string = '';
  componentName: string = '';
  selectedLanguage: string = '';
  formElements: any[] = [];
  elementTypes: any[] = [
    { name: 'Input', value: 'input' },
    { name: 'Select country', value: 'select_country' },
    { name: 'Text area', value: 'textarea' },
  ];
// arabicFile = require('/home/mahmoud/Desktop/Projects/frontend-angular/src/assets/countries/arabic.json').default;
// frenchFile = require('/home/mahmoud/Desktop/Projects/frontend-angular/src/assets/countries/french.json').default;
// englishFile = require('/home/mahmoud/Desktop/Projects/frontend-angular/src/assets/countries/english.json').default;

// Now you can use arabicFile, frenchFile, and englishFile as needed in your code


  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent!: MonacoEditorComponent;

  ngOnInit() {
  }


  onElementTypeChange(event: any) {

    if (event.target.value === 'select_country') {
      this.openDialog();
    }

  }

  openDialog() {
    const dialogRef = this.dialog.open(CountrySelectDialogComponent, {
      width: '300px', 
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.countryAPI = result==='api'?true:false;
    });
  
}


  changeLanguage(event: any){
    this.countryValuesLanguage = event.target.value;
  }

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
    this.generatedCode = '';
    
    switch (language) {
      case 'html':
        this.generateHtmlCode();
        break;
        
      case 'typescript':
        this.generateTypeScriptCode();
        break;
        
      case 'css':
        this.generateCssCode();
        break;
        
      case 'spec':
        this.generateSpecCode();
        break;
    }
    
    this.editorOptions.language = language;
    this.loadMonacoLanguage(language);
  }
  
  generateHtmlCode() {
    for (const element of this.formElements) {
      switch (element.type) {
        case 'input':
          this.generatedCode += this.generateInputElementHtml(element);
          break;
        case 'select_country':
          this.generatedCode += this.generateSelectElementHtml(element);
          break;
        case 'textarea':
          this.generatedCode += this.generateTextareaElementHtml(element);
          break;
        // Add cases for other element types if needed
      }
    }
  }
  generateInputElementTypescript() : string {
    return `
    // ${this.componentSelectorName}.component.ts
    import { Component } from '@angular/core';
    
    @Component({
      selector: 'app-${this.componentSelectorName}',
      templateUrl: './${this.componentSelectorName}.component.html',
      styleUrls: ['./${this.componentSelectorName}.component.css']
    })
    export class ${this.componentClassName}Component {
    
    }
        `;
  }
  generateTypeScriptCode() {
    for(const element of this.formElements){
      switch(element.type){
        case 'input':
          this.generatedCode += this.generateInputElementTypescript();
          break;
        case 'select_country':
          this.generatedCode += this.generateSelectElementTypescript();
          break;
      }
    }

  }
  generateSelectElementTypescript() {

    if(this.countryAPI){
      console.log("skrrra")
      return `
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-${this.componentSelectorName}',
  templateUrl: './${this.componentSelectorName}.component.html',
  styleUrls: ['./${this.componentSelectorName}.component.css']
})
export class ${this.componentClassName}Component {
  countries : any;
  constructor(private http: HttpClient) {
    this.http.get<any>('https://raw.githubusercontent.com/YASSlNE/I-Way-project/master/src/assets/countries/${this.countryValuesLanguage}.json').subscribe(data => {
      this.countries = data;
      console.log(data); 
    });
  }
}`;
      
    }
    else{
      console.log("no skrrra")
    return `
// ${this.componentSelectorName}.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-${this.componentSelectorName}',
  templateUrl: './${this.componentSelectorName}.component.html',
  styleUrls: ['./${this.componentSelectorName}.component.css']
})
export class ${this.componentClassName}Component {
  countries = ${this.countryValuesLanguage==='english' ? JSON.stringify(englishCountries)  : this.countryValuesLanguage==='french' ? JSON.stringify(frenchCountries) :  JSON.stringify(arabicCountries)}
}
        `;
  }
}
  
  generateCssCode() {
    this.generatedCode = `
  /* ${this.componentSelectorName}.component.css */
    `;
  }
  
  generateSpecCode() {
    this.generatedCode = `
  // ${this.componentSelectorName}.component.spec.ts
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
  }
  
  
  loadMonacoLanguage(language: string) {
    const model = this.monacoComponent.editor.getModel();
    if (model) {
      monaco.editor.setModelLanguage(model, language);
    }
  }
  

  generateInputElementHtml(element: any): string {
    return `
  <div>
    <label for="${element.name}" class="block mb-2 text-sm font-medium text-gray-900">
      ${element.name}
    </label>
    <input type="text" id="${element.name}" name="${element.name}"
      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      [(ngModel)]="elementValues['${element.name}']"
    >
  </div>
    `;
  }
  
  generateSelectElementHtml(element: any): string {
    return `
    <div>
      <label for="${element.name}" class="block mb-2 text-sm font-medium text-gray-900">
        ${element.name}
      </label>
      <select
        id="${element.name}"
        name="${element.name}"
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option *ngFor="let country of countries" [value]="country.name">
          <span>{{ country.name }}</span>
        </option>
      </select>
    </div>
      `;
    }

  getCountryOptions(elementName: string): Array<any> {
    const language = this.countryValuesLanguage;
    if (language === 'english') {
      return englishCountries;
    } else if (language === 'arabic') {
      return arabicCountries;
    } else if (language === 'french') {
      return frenchCountries;
    } else {
      return [];
    }
  }

  generateTextareaElementHtml(element: any): string {
    return `
  <div>
    <label for="${element.name}" class="block mb-2 text-sm font-medium text-gray-900">
      ${element.name}
    </label>
    <!-- Generate your textarea element code here -->
  </div>
    `;
  }
  

  generateCode() {
    this.elementsArray = '';
    this.toggleWhiteSpace = true;
    this.loading = true;
    this.elementValues = {};
    for (let element of this.formElements) {
      this.elementValues[element.name] = ''; // Initialize the value to an empty string
    }
    setTimeout(()=>{

    this.transformComponentName(this.componentName);
   
    // console.log("=====================================")
    this.loading = false; 

    this.switchEditorLanguage('html');

    // console.log("---------------------------------------")
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