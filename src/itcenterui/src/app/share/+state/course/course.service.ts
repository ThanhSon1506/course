import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_COURSE } from './course.constant';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

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
  swap($id){
    return this.httpClient.get(environment.apiUrl+URL_COURSE+'/swap/'+$id)
  }
  indexUser(){
    return this.httpClient.get(environment.apiUrl+URL_COURSE+'/indexUser');
  }
  indexAsc(){
    return this.httpClient.get(environment.apiUrl+URL_COURSE+'/indexAsc');
  }
  indexDesc(){
    return this.httpClient.get(environment.apiUrl+URL_COURSE+'/indexDesc');
  }
  getCourse(){
    return this.httpClient.get(environment.apiUrl+URL_COURSE+'/index');
  }
  getTeacher($id){
    return this.httpClient.get(environment.apiUrl+URL_COURSE+'/teacher/'+$id)
  }
  getTeacherTrue($id){
    return this.httpClient.get(environment.apiUrl+URL_COURSE+'/teacherTrue/'+$id)
  }
  getCourseFalse(){
    return this.httpClient.get(environment.apiUrl+URL_COURSE+'/indexFalse');
  }
  countCourse(){
    return this.httpClient.get(environment.apiUrl+URL_COURSE+'/count');
  }
    
  getCourseFindTeacher($id){
    return this.httpClient.get(environment.apiUrl+URL_COURSE+'/findTeacher/'+$id);
  }
  getCourseFindLanguage($id){
    return this.httpClient.get(environment.apiUrl+URL_COURSE+'/language/'+$id);
  }
  getCourseFindLevel($id){
    return this.httpClient.get(environment.apiUrl+URL_COURSE+'/level/'+$id);
  }
  getCourseFindCategory($id){
    return this.httpClient.get(environment.apiUrl+URL_COURSE+'/category/'+$id);
  }
  update(data,id){
    // console.log(this.httpClient.patch(environment.apiUrl+URL_COURSE+id,data));
    return this.httpClient.patch(environment.apiUrl+URL_COURSE+'/update/'+id,data);
  }
  updateImg(data,id){
    // console.log(this.httpClient.patch(environment.apiUrl+URL_COURSE+id,data));
    return this.httpClient.post(environment.apiUrl+URL_COURSE+'/updateImg/'+id,data);
  }
  delete(id){
    return this.httpClient.delete(environment.apiUrl+URL_COURSE+'/delete/'+id);
  }
  destroyCategory(id){
    return this.httpClient.delete(environment.apiUrl+URL_COURSE+'/destroy/category/'+id);
  }
  destroyLanguage(id){
    return this.httpClient.delete(environment.apiUrl+URL_COURSE+'/destroy/language/'+id);
  }
  destroyLevel(id){
    return this.httpClient.delete(environment.apiUrl+URL_COURSE+'/destroy/level/'+id);
  }
  destroyTeacher(id){
    return this.httpClient.delete(environment.apiUrl+URL_COURSE+'/destroy/teacher/'+id);
  }
  getCoursedel(){
    // console.log(this.httpClient.get(environment.apiUrl+'/api/account-del'));
    return this.httpClient.get(environment.apiUrl+'/api/account-del');
  
  }
  create(data){
    // console.log(environment.apiUrl);
    return this.httpClient.post(environment.apiUrl+URL_COURSE+'/create',data);
  
  }
  login(data){
    return this.httpClient.post(environment.apiUrl+URL_COURSE+'/login',data);
  }

  findCourse(id){
    return this.httpClient.get(environment.apiUrl+URL_COURSE+'/findCourse/'+id);
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
