import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_LANGUAGE } from './language.constant';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  endPoint = environment;
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

getLanguage(){
  return this.httpClient.get(environment.apiUrl+URL_LANGUAGE+'/index');
}
create(data){
  return this.httpClient.post(environment.apiUrl+URL_LANGUAGE+'/create',data);
}
update(data,id){
  return this.httpClient.patch(environment.apiUrl+URL_LANGUAGE+'/update/'+id,data);
}
delete(id){
  return this.httpClient.delete(environment.apiUrl+URL_LANGUAGE+'/delete/'+id);
    
}


  
  public dataLanguage: any = [];
  public subject = new Subject<any>();
  private dataSource = new  BehaviorSubject(this.dataLanguage);
  currentLanguage = this.dataSource.asObservable();
  changeLanguage(data: string) {
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
