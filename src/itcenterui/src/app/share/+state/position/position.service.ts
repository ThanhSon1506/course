import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { URL_LOCALHOST } from '../state.constant';
import { URL_POSITION } from './position.constant';
import { environment } from 'src/environments/environment';
import { Position } from './position.model';



@Injectable({
  providedIn: 'root'
})
export class PositionService {
  endPoint = environment;
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

getPosition(){
  return this.httpClient.get(environment.apiUrl+URL_POSITION+'/index');
}
create(data){
  return this.httpClient.post(environment.apiUrl+URL_POSITION+'/create',data);
}
update(data,id){
  return this.httpClient.patch(environment.apiUrl+URL_POSITION+'/update/'+id,data);
}
delete(id){
  return this.httpClient.delete(environment.apiUrl+URL_POSITION+'/delete/'+id);
    
}
  getUser(id): Observable<Position> {
    return this.httpClient.get<Position>(this.endPoint + URL_POSITION + id)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }  


  
  public editDataDetails: any = [];
  public subject = new Subject<any>();
  private dataSource = new  BehaviorSubject(this.editDataDetails);
  currentPosition = this.dataSource.asObservable();
  changePosition(data: string) {
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


