import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';





const AUTH_API = 'http://localhost:8080/api/problem';

const userJson = localStorage.getItem('auth-user');
const user = JSON.parse(userJson || '{}');

const headers = new HttpHeaders({
  "authorization": "Bearer " + user.token,
})


@Injectable({
  providedIn: 'root'
})
export class ProblemService {


  

  constructor(private http: HttpClient) {}

  getAllProblems(): Observable<any>{
    console.log('Token:', headers.get('Authorization'));

    return this.http.get(AUTH_API, {headers: headers, withCredentials: true});
    
  }
}
