import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_STUDENT } from './student.constant';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

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
  sameStudentAccount() {
    return this.httpClient.get(environment.apiUrl+URL_STUDENT+'/sameAccount');
  }

  getStudent(){
    return this.httpClient.get(environment.apiUrl+URL_STUDENT+'/index');
  }
  getStudentFindAccount($id){
    console.log(this.httpClient.get(environment.apiUrl+URL_STUDENT+'/account/'+$id));
    return this.httpClient.get(environment.apiUrl+URL_STUDENT+'/account/'+$id);
  }
  update(data,id){
    return this.httpClient.patch(environment.apiUrl+URL_STUDENT+'/update/'+id,data);
  }
  delete(id){
    return this.httpClient.delete(environment.apiUrl+URL_STUDENT+'/delete/'+id);
  }
  getStudentdel(){
    // console.log(this.httpClient.get(environment.apiUrl+'/api/account-del'));
    return this.httpClient.get(environment.apiUrl+'/api/account-del');
  
  }
  create(data){
    // console.log(environment.apiUrl);
    return this.httpClient.post(environment.apiUrl+URL_STUDENT+'/create',data);
  
  }
  login(data){
    return this.httpClient.post(environment.apiUrl+URL_STUDENT+'/login',data);
   
  }

  public studentData: any = [];
  public subject = new Subject<any>();
  private messageStudent = new  BehaviorSubject(this.studentData);
  currentStudent = this.messageStudent.asObservable();
  changeStudent(message: string) {
    this.messageStudent.next(message)
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
