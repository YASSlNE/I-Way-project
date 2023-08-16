import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/views/auth/services/auth.service";
import { StorageService } from "src/app/views/auth/services/storage.service";

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
})
export class AdminNavbarComponent implements OnInit {
  onLogout(): void {
    if (confirm('Are you sure you want to log out?')) {
      this.authService.logout().subscribe({
        next: () => {
          this.storageService.clean();
          console.log('User logged out successfully')
          this.router.navigate(['/auth/login']);
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
isLoggedIn: any;
username: any;
  constructor(private router: Router,
              private storageService: StorageService, 
              private authService:AuthService) {}
  
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn;
    this.username = this.storageService.getUser()["username"];
  }
}
