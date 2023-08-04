import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {



  generatedCode: string = '';
  componentName: string = '';
  selectedLanguage: string = 'javascript';
  formElements: any[] = [];
  elementTypes: any[] = [{name:"Input", value:"input"}, {name: "Select", value: "select"}, {name : "Text area", value: "textarea"}];

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


  generateCode() {
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
  
    let code = `
      <form id="form" action="#" class="space-y-8">
        ${elementsArray}
      </form>`;
    
    this.generatedCode = code;
  }
  


}


