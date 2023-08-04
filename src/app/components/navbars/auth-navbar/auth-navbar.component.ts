import { Component, OnInit, ViewChild } from "@angular/core";
// import { LoginComponent } from "src/app/views/auth/login/login.component";
import { LogoutComponent } from "src/app/views/auth/logout/logout.component";
import { StorageService } from "src/app/views/auth/services/storage.service";

@Component({
  selector: "app-auth-navbar",
  templateUrl: "./auth-navbar.component.html",
})
export class AuthNavbarComponent implements OnInit {

  @ViewChild(LogoutComponent) logoutComponent!: LogoutComponent;
  // @ViewChild(LoginComponent) loginComponent!: LoginComponent;

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  navbarOpen = false;
  roles: string[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
      this.isLoggedIn = this.storageService.isLoggedIn();
  
      if (this.isLoggedIn) {
        const user = this.storageService.getUser();
        this.roles = user.roles;
  
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
  
        this.username = user.username;
      }
    
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

  onLogout(){
    console.log("!!!!!!!!!!!!!!!!!!!!!")
    this.logoutComponent.logout();
  }
}
