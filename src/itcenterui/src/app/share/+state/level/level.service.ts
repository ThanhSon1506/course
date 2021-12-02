import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_LEVEL } from './level.constant';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  
  endPoint = environment;
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

getLevel(){
  return this.httpClient.get(environment.apiUrl+URL_LEVEL+'/index');
}
create(data){
  return this.httpClient.post(environment.apiUrl+URL_LEVEL+'/create',data);
}
update(data,id){
  return this.httpClient.patch(environment.apiUrl+URL_LEVEL+'/update/'+id,data);
}
delete(id){
  return this.httpClient.delete(environment.apiUrl+URL_LEVEL+'/delete/'+id);
    
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
