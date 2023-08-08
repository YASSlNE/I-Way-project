import { Injectable } from '@angular/core';
import {  MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor';
import {englishCountries} from '../../../../assets/countries/english';
import {arabicCountries} from '../../../../assets/countries/arabic';
import {frenchCountries} from '../../../../assets/countries/french';
import { CountrySelectDialogComponent } from './countryselectdialog.component';

@Injectable({
  providedIn: 'root',
})
export class SharedFormGeneratorService {
  editorOptions: MonacoEditorConstructionOptions = {
    language: 'html',
    theme: 'vs-dark',
    automaticLayout: true,
    readOnly: true,
  };

  editorOverrideOptions: monaco.editor.IEditorOverrideServices = {
    suggest: {
      quickSuggestions: false,
      suggestions: false,
    },
    diagnostics: {
      validate: false,
    },
  };

  elementValues: { 
    [elementName: string]: string 
  } = {};

  
  selectedLanguage : string = 'english';
  countryAPI: any = false;
  toggleWhiteSpace: boolean = false;
  componentSelectorName : string = '';
  componentClassName : string = '';
  loading: boolean = false;
  elementsArray = '';
  generatedCode: string = '';
  componentName: string = '';
  selectedProgrammingLanguage: string = 'html';
  formElements: any[] = [];
  elementTypes: any[] = [
    { name: 'Input', value: 'input' },
    { name: 'Select country', value: 'select_country' },
    { name: 'Text area', value: 'textarea' },
    { name: 'Select gender', value: 'select_gender' },
  ];
  dialog: any;
  constructor() {
  }








  changeLanguage(event: any){
    this.selectedLanguage = event.target.value;
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
        case 'select_gender':
          this.generatedCode += this.generateSelectGenderElementHtml(element);
      }
    }
  }
generateSelectGenderElementHtml(element: any): string {
  const genderOptions = this.selectedLanguage == 'english' ?  [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ]:
  this.selectedLanguage == 'arabic' ?  [
    { value: 'male', label: 'ذكر' },
    { value: 'female', label: 'أنثى' }
  ]
  : [
    { value: 'male', label: 'Homme' },
    { value: 'female', label: 'Femme' }
  ];

  const optionsHtml = genderOptions
    .map(option => `<option value="${option.value}">${option.label}</option>`)
    .join('');

  const selectHtml = `
    <select [(ngModel)]="${element.name}" name="${element.name}" id="${element.name}">
      ${optionsHtml}
    </select>
  `;

  return selectHtml;
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


        `;
  }
  generateTypeScriptCode() {
    let uniqueArray :any[]= [];
    const seenIds = new Set();
    let unique =  this.formElements
     unique.forEach(obj => {
      if (!seenIds.has(obj.type)) {
        uniqueArray.push(obj);
        seenIds.add(obj.type);
      }
    });
    this.generatedCode = this.generateInputElementTypescript();
    for(const element of uniqueArray){
      switch(element.type){
        
        case 'select_country':
          this.generatedCode += this.generateSelectCountryElementTypescript();
          break;
      }
    }
    for(const element of this.formElements){
          this.generatedCode += ` \n${element.name} : any;`
      
    }
    this.generatedCode += "\n}"
  }
  generateSelectCountryElementTypescript() {

    if(this.countryAPI){
      return `

countries : any;
constructor(private http: HttpClient) {
  this.http.get<any>('https://raw.githubusercontent.com/YASSlNE/I-Way-project/master/src/assets/countries/${this.selectedLanguage}.json').subscribe(data => {
    this.countries = data;
    console.log(data); 
  });
}`;
      
    }
    else{
    return `

  countries = ${this.selectedLanguage==='english' ? JSON.stringify(englishCountries)  : this.selectedLanguage==='french' ? JSON.stringify(frenchCountries) :  JSON.stringify(arabicCountries)}

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

  generateInputElementHtml(element: any): string {
    return `
<div>
  <label for="${element.name}" class="block mb-2 text-sm font-medium text-gray-900">
    ${element.name}
  </label>
  <input type="text" id="${element.name}" name="${element.name}"
    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    [(ngModel)]="${element.name}"
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
    [(ngModel)]="${element.name}"
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
    const language = this.selectedLanguage;
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

  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.generatedCode);
      console.log('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  }
  onElementTypeChange(event: any) {
    console.log("slkdjfhqsldkjfqhsdlkjh")
    if (event.target.value === 'select_country') {
      this.openDialog();
    }

  }
  openDialog() {
    const dialogRef = this.dialog.open(CountrySelectDialogComponent, {
      width: '300px', 
      data: {},
    });

    dialogRef.afterClosed().subscribe((result : any) => {
      this.countryAPI = result==='api'?true:false;
    });
  
}
}
