import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { URL_STUDENT } from './+state/account/account.constant';
// import { Student } from './+state/student/student.model';
import { URL_ACCOUNT } from './account.constant';
import { Account } from './account.model';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

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
  getUsers(){
    return this.httpClient.get(environment.apiUrl+URL_ACCOUNT+'/index');
  }
  getUsersFindPosition($id){
    return this.httpClient.get(environment.apiUrl+URL_ACCOUNT+'/find/'+$id);
  }
  updateUsers(data,id){
    console.log(this.httpClient.patch(environment.apiUrl+URL_ACCOUNT+id,data));
    return this.httpClient.patch(environment.apiUrl+URL_ACCOUNT+'/update/'+id,data);
  }
  deleteUser(id){
    return this.httpClient.delete(environment.apiUrl+URL_ACCOUNT+'/delete/'+id);
  }
  destroy(id){
    return this.httpClient.delete(environment.apiUrl+URL_ACCOUNT+'/destroy/'+id);
  }
  getUsersdel(){
    // console.log(this.httpClient.get(environment.apiUrl+'/api/account-del'));
    return this.httpClient.get(environment.apiUrl+'/api/account-del');
  
  }
  createUser(data){
    // console.log(environment.apiUrl);
    return this.httpClient.post(environment.apiUrl+URL_ACCOUNT+'/register',data);
  
  }
  login(data){
    return this.httpClient.post(environment.apiUrl+URL_ACCOUNT+'/login',data);
   
  }
  getUser(id): Observable<Account> {
    return this.httpClient.get<Account>(this.endPoint + URL_ACCOUNT + id)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }  

  idDropAccount(){
    return this.httpClient.get(environment.apiUrl+URL_ACCOUNT+'/idDropAccount');

  }
  create(employee): Observable<Account> {
    return this.httpClient.post<Account>(this.endPoint + URL_ACCOUNT, JSON.stringify(employee), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }  

  update(id, data): Observable<Account> {
    return this.httpClient.put<Account>(this.endPoint + URL_ACCOUNT + id, JSON.stringify(data), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

  delete(id){
    return this.httpClient.delete<Account>(this.endPoint + URL_ACCOUNT + id, this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
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


