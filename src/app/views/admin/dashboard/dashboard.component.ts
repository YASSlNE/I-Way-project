import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { SharedFormGeneratorService } from './sharedFormGeneratorService';

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

  editorOptions: any;
  editorOverrideOptions: any;
  elementValues: any;
  selectedLanguage: any;
  countryAPI: any;
  toggleWhiteSpace: any;
  componentSelectorName: any;
  componentClassName: any;
  loading: any;
  elementsArray: any;
  generatedCode: any;
  componentName: any;
  selectedProgrammingLanguage: any;
  formElements: any;
  elementTypes: any;
  monacoLoaderService: any;
  changeLanguage : any;
  transformComponentName : any;
  addFormElement : any;
  removeFormElement : any;
  generateHtmlCode: any;
  generateSelectGenderElementHtml : any;
  generateInputElementTypescript : any;
  generateTypeScriptCode : any;
  generateSelectCountryElementTypescript : any;
  generateCssCode : any;
  generateSpecCode : any;
  generateInputElementHtml : any;
  generateSelectElementHtml:  any;
  getCountryOptions : any;
  generateTextareaElementHtml : any;
  copyCode : any;
  onElementTypeChange:any;
  openDialog: any;

  

  constructor(private sharedFormGeneratorService: SharedFormGeneratorService, private dialog: MatDialog) {}



  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent!: MonacoEditorComponent;


  ngOnInit() {
    this.editorOptions = this.sharedFormGeneratorService.editorOptions;
    this.editorOverrideOptions = this.sharedFormGeneratorService.editorOverrideOptions;
    this.elementTypes = this.sharedFormGeneratorService.elementTypes;
    this.formElements = this.sharedFormGeneratorService.formElements;
    this.componentName = this.sharedFormGeneratorService.componentName;
    this.generatedCode = this.sharedFormGeneratorService.generatedCode;
    this.elementsArray = this.sharedFormGeneratorService.elementsArray;
    this.loading = this.sharedFormGeneratorService.loading;
    this.componentClassName = this.sharedFormGeneratorService.componentClassName;
    this.componentSelectorName = this.sharedFormGeneratorService.componentSelectorName;
    this.toggleWhiteSpace = this.sharedFormGeneratorService.toggleWhiteSpace;
    this.countryAPI = this.sharedFormGeneratorService.countryAPI;
    this.selectedLanguage = this.sharedFormGeneratorService.selectedLanguage;
    this.elementValues = this.sharedFormGeneratorService.elementValues;
    this.copyCode = this.sharedFormGeneratorService.copyCode;
    this.generateTextareaElementHtml = this.sharedFormGeneratorService.generateTextareaElementHtml;
    this.getCountryOptions = this.sharedFormGeneratorService.getCountryOptions;
    this.generateSelectElementHtml = this.sharedFormGeneratorService.generateSelectElementHtml;
    this.generateInputElementHtml = this.sharedFormGeneratorService.generateInputElementHtml;
    this.generateSpecCode = this.sharedFormGeneratorService.generateSpecCode;
    this.generateCssCode = this.sharedFormGeneratorService.generateCssCode;
    this.generateSelectCountryElementTypescript = this.sharedFormGeneratorService.generateSelectCountryElementTypescript;
    this.generateTypeScriptCode = this.sharedFormGeneratorService.generateTypeScriptCode;
    this.generateInputElementTypescript = this.sharedFormGeneratorService.generateInputElementTypescript;
    this.generateSelectGenderElementHtml = this.sharedFormGeneratorService.generateSelectGenderElementHtml;
    this.generateHtmlCode = this.sharedFormGeneratorService.generateHtmlCode;
    this.removeFormElement = this.sharedFormGeneratorService.removeFormElement;
    this.addFormElement = this.sharedFormGeneratorService.addFormElement;
    this.transformComponentName = this.sharedFormGeneratorService.transformComponentName;
    this.onElementTypeChange = this.sharedFormGeneratorService.onElementTypeChange;
    this.openDialog = this.sharedFormGeneratorService.openDialog;
    this.changeLanguage = this.sharedFormGeneratorService.changeLanguage;
  }


  switchEditorLanguage(language: string) {
  this.selectedProgrammingLanguage = language;
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
  loadMonacoLanguage(language: string) {
  const model = this.monacoComponent.editor.getModel();
  if (model) {
    monaco.editor.setModelLanguage(model, language);
  }
}




}