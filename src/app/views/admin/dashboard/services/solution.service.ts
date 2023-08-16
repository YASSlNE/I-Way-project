import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/views/auth/services/storage.service';


const AUTH_API = 'http://localhost:8080/api/solution';
const userJson = localStorage.getItem('auth-user');
const user = JSON.parse(userJson || '{}');
const headers = new HttpHeaders({
  "authorization": "Bearer " + user.token,
})

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(private http: HttpClient, private storageService: StorageService) {}

  addSolution(id : number, code : any, description : any, language : any, score: any = 0){
    return this.http.post(AUTH_API+'/affectToProblem/'+id, {
      code : code,
      description : description,
      language : language,
      score: score
    }, {headers: headers, withCredentials: true});
  }


  getSolutionsByProblem(id : number){
    return this.http.get(
      AUTH_API+'/problem/'+id,
      {headers: headers, withCredentials: true}
    )
  }

  upVoteSolution(id : number){
    return this.http.put(
      AUTH_API+'/upVote/'+id,
      {},
      {headers: headers, withCredentials: true}
    )
  }
  
}
