import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms'; // Add this line
import { LoginComponent } from '../login/login.component';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  // styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  isLoading = false; // New property to handle loading state

  isVisible = false;

  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  loggedInUser: string = '';
  constructor(private loginComponent: LoginComponent,  private storageService: StorageService, private authService: AuthService) { 
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.loggedInUser = this.storageService.getUser().username;
    }
  }

  ngOnInit(): void {
    console.log(this.isLoggedIn);
  }


  unHidePassword() {
    this.isVisible = !this.isVisible;
  }



  onSubmit(): void {
    this.isLoading = true;
    const { username, email, password } = this.form;
    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.loginComponent.onRegistrationLogin(username, password);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
      // complete: ()=>{
      //   this.isLoading = false; 
      // }
    });
  }
  





}
