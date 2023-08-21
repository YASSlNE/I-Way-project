import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
@Injectable()
export class TokenExpiredInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router, private storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("error message")
        console.log(error)
        if (error.status === 401) {
            alert("Your session has expired. Please login again.");
        this.storageService.clean();
          this.authService.logout();
          this.router.navigate(['auth/login']);
        }
        return throwError(error);
      })
    );
  }
}
