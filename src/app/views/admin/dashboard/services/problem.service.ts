import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/views/auth/services/storage.service';





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

  constructor(private http: HttpClient, private storageService: StorageService) {}

  getAllProblems(): Observable<any>{
    console.log("=================="+this.storageService.getUser().username)
    console.log('Token:', headers.get('Authorization'));
    return this.http.get(AUTH_API, {headers: headers, withCredentials: true});
  }

  getAllProblemsByUser(): Observable<any>{
    console.log('Token:', headers.get('Authorization'));
    let problems = this.http.get(AUTH_API + '/user/'+ this.storageService.getUser().username, {headers: headers, withCredentials: true});
    return problems
  }

  getUserByProblemId(id: number): Observable<any>{
    return this.http.get(AUTH_API+'/id/'+ id, {headers: headers, withCredentials: true});
  }

  addProblem(description: string): Observable<any>{
    return this.http.post(AUTH_API+'/create', {
      description: description
    }, {headers: headers, withCredentials: true});
  }


  deleteProblem(id: number): Observable<any>{
    console.log("======================================");
    return this.http.delete(AUTH_API+'/delete/'+id, {headers: headers, withCredentials: true});
  }
}