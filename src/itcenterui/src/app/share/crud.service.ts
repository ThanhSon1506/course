import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { URL_STUDENT } from './+state/student/student.constant';
import { Student } from './+state/student/student.model';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  endPoint = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
  public getAll(){
    return this.httpClient.get("http://localhost:3000/users");
  }
  getUsers(): Observable<Student> {
    return this.httpClient.get<Student>(this.endPoint + URL_STUDENT)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

  getUser(id): Observable<Student> {
    return this.httpClient.get<Student>(this.endPoint + URL_STUDENT + id)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }  

  create(employee): Observable<Student> {
    return this.httpClient.post<Student>(this.endPoint + URL_STUDENT, JSON.stringify(employee), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }  

  update(id, data): Observable<Student> {
    return this.httpClient.put<Student>(this.endPoint + URL_STUDENT + id, JSON.stringify(data), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

  delete(id){
    return this.httpClient.delete<Student>(this.endPoint + URL_STUDENT + id, this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
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


