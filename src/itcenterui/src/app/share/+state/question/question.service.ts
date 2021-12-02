import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_QUESTION } from './question.constant';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  endPoint = environment;
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

getCategory(){
  return this.httpClient.get(environment.apiUrl+URL_QUESTION+'/index');
}
create(data){
  console.log(data);
  return this.httpClient.post(environment.apiUrl+URL_QUESTION+'/create',data);
}
update(data,id){
  return this.httpClient.patch(environment.apiUrl+URL_QUESTION+'/update/'+id,data);
}
delete(id){
  return this.httpClient.delete(environment.apiUrl+URL_QUESTION+'/delete/'+id);
}
readQuestion(id:any):Observable<any>{
  return this.httpClient.get(environment.apiUrl+URL_QUESTION+'/readQuestion/'+id);
}



  
  public dataQuestion: any = [];
  public subject = new Subject<any>();
  private dataSource = new  BehaviorSubject(this.dataQuestion);
  currentQuestion = this.dataSource.asObservable();
  changeCategory(data: string) {
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
