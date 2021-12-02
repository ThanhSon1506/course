import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) 
  { }
  createUser(data){
    // console.log(environment.apiUrl);
    return this.http.post(environment.apiUrl+'/api/register',data);
  }
  login(data){
    return this.http.post(environment.apiUrl+'/api/login',data);
  }
}
