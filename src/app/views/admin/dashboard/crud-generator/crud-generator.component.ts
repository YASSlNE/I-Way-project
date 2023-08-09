import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-crud-generator',
  templateUrl: './crud-generator.component.html',
  styleUrls: ['./crud-generator.component.css']
})
export class CrudGeneratorComponent implements OnInit{

  exampleConfig: any = { 
    "title": "",
    "entity": "",
    "api": {
      "url": ""
    },
    "filter": [
      ""
    ],
    "fields": [
      {
        "name": "",
        "label": "",
        "isId": true ,//true or false
        "readonly": true, //true or false
        "type": "" // number...etc 
      },
    ]
};
  constructor() { }

  ngOnInit(): void {
    
  }

}
