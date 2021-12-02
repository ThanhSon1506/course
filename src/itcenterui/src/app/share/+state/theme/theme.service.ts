import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_THEME } from './theme.constant';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  endPoint = environment;
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

getTheme(){
  return this.httpClient.get(environment.apiUrl+URL_THEME+'/index');
}
create(data){
  return this.httpClient.post(environment.apiUrl+URL_THEME+'/create',data);
}
update(data,id){
  return this.httpClient.patch(environment.apiUrl+URL_THEME+'/update/'+id,data);
}
delete(id){
  return this.httpClient.delete(environment.apiUrl+URL_THEME+'/delete/'+id);
    
}
destroyCourse(id){
  return this.httpClient.delete(environment.apiUrl+URL_THEME+'/destroy/course/'+id);
}
getThemeFindCourse(id){
  return this.httpClient.get(environment.apiUrl+URL_THEME+'/course/'+id);

}
 


  
  public editDataDetails: any = [];
  public subject = new Subject<any>();
  private dataSource = new  BehaviorSubject(this.editDataDetails);
  currentTheme = this.dataSource.asObservable();
  changeTheme(data: string) {
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
