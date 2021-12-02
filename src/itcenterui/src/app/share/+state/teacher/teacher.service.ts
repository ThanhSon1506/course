import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_TEACHER } from './teacher.constant';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

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
  sameTeacherAccount() {
    return this.httpClient.get(environment.apiUrl+URL_TEACHER+'/sameAccount');
  }

  getTeacher(){
    return this.httpClient.get(environment.apiUrl+URL_TEACHER+'/index');
  }
  getTeacherFindAccount($id){
    console.log(this.httpClient.get(environment.apiUrl+URL_TEACHER+'/account/'+$id));
    return this.httpClient.get(environment.apiUrl+URL_TEACHER+'/account/'+$id);
  }
  getTeacherFindLanguage($id){
    return this.httpClient.get(environment.apiUrl+URL_TEACHER+'/language/'+$id);
  }
  getTeacherFindLevel($id){
    return this.httpClient.get(environment.apiUrl+URL_TEACHER+'/level/'+$id);
  }
  getTeacherFindCategory($id){
    return this.httpClient.get(environment.apiUrl+URL_TEACHER+'/category/'+$id);
  }
  update(data,id){
    return this.httpClient.patch(environment.apiUrl+URL_TEACHER+'/update/'+id,data);
  }
  delete(id){
    return this.httpClient.delete(environment.apiUrl+URL_TEACHER+'/delete/'+id);
  }
  getTeacherdel(){
    // console.log(this.httpClient.get(environment.apiUrl+'/api/account-del'));
    return this.httpClient.get(environment.apiUrl+'/api/account-del');
  
  }
  create(data){
    // console.log(environment.apiUrl);
    return this.httpClient.post('http://127.0.0.1:8000/api/teacher/create',data);
  
  }

  public teacherData: any = [];
  public subject = new Subject<any>();
  private messageTeacher = new  BehaviorSubject(this.teacherData);
  currentTeacher = this.messageTeacher.asObservable();
  changeTeacher(message: string) {
    this.messageTeacher.next(message)
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
