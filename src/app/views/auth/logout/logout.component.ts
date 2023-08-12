import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private storageService:StorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    
  }
  logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      this.authService.logout().subscribe({
        next: () => {
          this.storageService.clean();
          console.log('User logged out successfully')
          window.location.reload();
          this.router.navigate(['/auth/login']);
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

}
