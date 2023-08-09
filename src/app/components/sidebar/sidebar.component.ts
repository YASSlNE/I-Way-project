import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  myForm!: FormGroup<any>;

  constructor(private router: Router) {}

  ngOnInit() {

  }

  toggleCollapseShow(classes: any) {
    this.collapseShow = classes;
  }
}
