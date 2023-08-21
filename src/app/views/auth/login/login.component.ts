import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {



  isVisible = false;

  unHidePassword(){
    this.isVisible = !this.isVisible;
  }
  isLoading = false;


  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  rememberMe: boolean=false;
  username: any;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router // Inject the Router
  ) { }
    
  onRememberMeChange(): void {
    console.log("onRememberMeChange")
    localStorage.setItem('rememberMe', this.rememberMe.toString());
  }


  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.storageService.isLoggedIn()) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.isLoggedIn = true;
      setTimeout(() => {
        this.router.navigate(['admin/dashboard']); // Redirect to the desired route
      }, 2000); // Wait for 2 seconds before redirecting
  
    }
    
  }


  onRegistrationLogin(username : any, password : any): void{
    this.authService.login(username, password, false).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      }
    })
  }

  onSubmit(): void {
    this.isLoading = true;

    const { username, password } = this.form;

    this.authService.login(username, password, this.rememberMe).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        localStorage.setItem('rememberedUsername', username);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }





  reloadPage(): void {
    window.location.reload();
  }
}
