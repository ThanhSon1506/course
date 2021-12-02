import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { URL_COMMENT } from './comment.constant';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  endPoint = environment;

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
  // public getAll(){
  //   return this.httpClient.get("http://localhost:3000/users");
  // }
index(id){
  return this.httpClient.get(environment.apiUrl+URL_COMMENT+'/index/'+id);
}
  update(data,id){
    // console.log(this.httpClient.patch(environment.apiUrl+URL_COMMENT+id,data));
    return this.httpClient.patch(environment.apiUrl+URL_COMMENT+'/update/'+id,data);
  }
  updateImg(data,id){
    // console.log(this.httpClient.patch(environment.apiUrl+URL_COMMENT+id,data));
    return this.httpClient.post(environment.apiUrl+URL_COMMENT+'/updateImg/'+id,data);
  }
  delete(id){
    return this.httpClient.delete(environment.apiUrl+URL_COMMENT+'/delete/'+id);
  }
  destroyCategory(id){
    return this.httpClient.delete(environment.apiUrl+URL_COMMENT+'/destroy/category/'+id);
  }
  destroyLanguage(id){
    return this.httpClient.delete(environment.apiUrl+URL_COMMENT+'/destroy/language/'+id);
  }
  destroyLevel(id){
    return this.httpClient.delete(environment.apiUrl+URL_COMMENT+'/destroy/level/'+id);
  }
  destroyTeacher(id){
    return this.httpClient.delete(environment.apiUrl+URL_COMMENT+'/destroy/teacher/'+id);
  }
  getCoursedel(){
    // console.log(this.httpClient.get(environment.apiUrl+'/api/account-del'));
    return this.httpClient.get(environment.apiUrl+'/api/account-del');
  
  }
  create(data){
    // console.log(environment.apiUrl);
    return this.httpClient.post(environment.apiUrl+URL_COMMENT+'/create',data);
  
  }
  login(data){
    return this.httpClient.post(environment.apiUrl+URL_COMMENT+'/login',data);
  }

  findCourse(id){
    return this.httpClient.get(environment.apiUrl+URL_COMMENT+'/findCourse/'+id);
  }

  public editDataDetails: any = [];
  public subject = new Subject<any>();
  private messageSource = new  BehaviorSubject(this.editDataDetails);
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
    }
  httpError(error) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }

}
