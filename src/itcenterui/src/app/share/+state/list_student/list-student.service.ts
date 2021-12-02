import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_LIST_STUDENT } from './list-student.constant';

@Injectable({
  providedIn: 'root'
})
export class ListStudentService {

 
  endPoint = environment;
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

index(){
  return this.httpClient.get(environment.apiUrl+URL_LIST_STUDENT+'/index');
}
swap(id){
  return this.httpClient.get(environment.apiUrl+URL_LIST_STUDENT+'/swap/'+id);
}
check(data){
  return this.httpClient.post(environment.apiUrl+URL_LIST_STUDENT+'/check',data);
}
count(){
  return this.httpClient.get(environment.apiUrl+URL_LIST_STUDENT+'/count');
}
find(id){
  return this.httpClient.get(environment.apiUrl+URL_LIST_STUDENT+'/find/'+id);
}
index_false(){
  return this.httpClient.get(environment.apiUrl+URL_LIST_STUDENT+'/index-false');
}
create(data){
  return this.httpClient.post(environment.apiUrl+URL_LIST_STUDENT+'/create',data);
}
update(data,id){
  return this.httpClient.patch(environment.apiUrl+URL_LIST_STUDENT+'/update/'+id,data);
}
delete(id){
  return this.httpClient.delete(environment.apiUrl+URL_LIST_STUDENT+'/delete/'+id);
    
}


  
  public dataLevel: any = [];
  public subject = new Subject<any>();
  private dataSource = new  BehaviorSubject(this.dataLevel);
  currentLevel = this.dataSource.asObservable();
  changeLevel(data: string) {
    this.dataSource.next(data)
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
