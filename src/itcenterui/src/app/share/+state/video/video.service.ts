import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URL_VIDEO } from './video.constant';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

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
  sameVideoAccount() {
    return this.httpClient.get(environment.apiUrl+URL_VIDEO+'/sameAccount');
  }

  getVideo(){
    return this.httpClient.get(environment.apiUrl+URL_VIDEO+'/index');
  }
  getVideoFindAccount($id){
    console.log(this.httpClient.get(environment.apiUrl+URL_VIDEO+'/account/'+$id));
    return this.httpClient.get(environment.apiUrl+URL_VIDEO+'/account/'+$id);
  }
  update(data,id){
    return this.httpClient.patch(environment.apiUrl+URL_VIDEO+'/update/'+id,data);
  }
  delete(id){
    return this.httpClient.delete(environment.apiUrl+URL_VIDEO+'/delete/'+id);
  }
  getVideodel(){
    // console.log(this.httpClient.get(environment.apiUrl+'/api/account-del'));
    return this.httpClient.get(environment.apiUrl+'/api/account-del');
  
  }
  create(data){
    // console.log(environment.apiUrl);
    return this.httpClient.post(environment.apiUrl+URL_VIDEO+'/create',data);
  
  }
  createVideo (data){
    // console.log(environment.apiUrl);
    return this.httpClient.post(environment.apiUrl+URL_VIDEO+'/createVideo',data);
  
  }
  login(data){
    return this.httpClient.post(environment.apiUrl+URL_VIDEO+'/login',data);
   
  }
  getVideoFindTheme($id){
    // console.log(this.httpClient.get(environment.apiUrl+URL_VIDEO+'/theme/'+$id));
    return this.httpClient.get(environment.apiUrl+URL_VIDEO+'/theme/'+$id);
  }
  destroyTheme(id){
    return this.httpClient.delete(environment.apiUrl+URL_VIDEO+'/destroy/theme/'+id);
  }

  public videoData: any = [];
  public subject = new Subject<any>();
  private messageVideo = new  BehaviorSubject(this.videoData);
  currentVideo= this.messageVideo.asObservable();
  changeVideo(message: string) {
    this.messageVideo.next(message)
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
