import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

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

  constructor(private authService: AuthService, private storageService: StorageService) {
    const storedRememberMe = localStorage.getItem('rememberMe');
    if (storedRememberMe !== null) {
      this.rememberMe = storedRememberMe === 'true';
    }

    if (this.rememberMe) {
      const rememberedUsername = localStorage.getItem('rememberedUsername');
      const rememberedPassword = localStorage.getItem('rememberedPassword');
      if (rememberedUsername && rememberedPassword) {
        
        this.form.username = rememberedUsername;
        this.form.password = rememberedPassword;
      }

    }

  }
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
      // this.roles = this.storageService.getUser().roles;
    }
    
  }


  onRegistrationLogin(username : any, password : any): void{
    this.authService.login(username, password).subscribe({
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

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        if (this.rememberMe) {
          // Store user credentials in LocalStorage
          localStorage.setItem('rememberedUsername', username);
          localStorage.setItem('rememberedPassword', password);
        } else {
          // Clear stored user credentials
          localStorage.removeItem('rememberedUsername');
          localStorage.removeItem('rememberedPassword');
        }

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
