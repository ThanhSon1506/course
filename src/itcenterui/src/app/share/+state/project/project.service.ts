import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_PROJECT } from './project.constant';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  endPoint = environment;
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

getProject(){
  return this.httpClient.get(environment.apiUrl+URL_PROJECT+'/index');
}
create(data){
  console.log(data);
  return this.httpClient.post(environment.apiUrl+URL_PROJECT+'/create',data);
}
update(data,id){
  return this.httpClient.patch(environment.apiUrl+URL_PROJECT+'/update/'+id,data);
}
delete(id){
  return this.httpClient.delete(environment.apiUrl+URL_PROJECT+'/delete/'+id);
    
}
  

  
  public editDataDetails: any = [];
  public subject = new Subject<any>();
  private dataSource = new  BehaviorSubject(this.editDataDetails);
  currentProject = this.dataSource.asObservable();
  changeProject(data: string) {
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
