import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';





const AUTH_API = 'http://localhost:8080/api/problem';



const userJson = localStorage.getItem('auth-user');
const user = JSON.parse(userJson || '{}');
const userName = localStorage.getItem('rememberedUsername');
const headers = new HttpHeaders({
  "authorization": "Bearer " + user.token,
})


@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(private http: HttpClient) {}

  getAllProblems(): Observable<any>{
    console.log("=================="+userName)
    console.log('Token:', headers.get('Authorization'));
    return this.http.get(AUTH_API, {headers: headers, withCredentials: true});
  }

  getAllProblemsByUser(): Observable<any>{
    console.log('Token:', headers.get('Authorization'));
    let problems = this.http.get(AUTH_API + '/user/'+ userName, {headers: headers, withCredentials: true});
    return problems
  }

  getUserByProblemId(id: number): Observable<any>{
    return this.http.get(AUTH_API+'/id/'+ id, {headers: headers, withCredentials: true});
  }
}
