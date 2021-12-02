import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_EXAM } from './exam.constant';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  endPoint = environment;
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

getExam(){
  return this.httpClient.get(environment.apiUrl+URL_EXAM+'/index');
}
create(data){
  return this.httpClient.post(environment.apiUrl+URL_EXAM+'/create',data);
}
update(data,id){
  return this.httpClient.patch(environment.apiUrl+URL_EXAM+'/update/'+id,data);
}
delete(id){
  return this.httpClient.delete(environment.apiUrl+URL_EXAM+'/delete/'+id);
    
}
findExam(data){
  return this.httpClient.post(environment.apiUrl+URL_EXAM+'/findExam',data);
}
findQuestionByExam(id){
  return this.httpClient.get(environment.apiUrl+URL_EXAM+'/findQuestionByExam/'+id);
}
readExam(id){
  return this.httpClient.get(environment.apiUrl+URL_EXAM+'/readExam/'+id);
}

  
  public dataExam: any = [];
  public subject = new Subject<any>();
  private dataSource = new  BehaviorSubject(this.dataExam);
  currentExam = this.dataSource.asObservable();
  changeExam(data: string) {
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
