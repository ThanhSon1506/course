import { Injectable } from "@angular/core";
import {CanActivate,Route, Router} from "@angular/router";
import jwt_decode from 'jwt-decode';
@Injectable({
    providedIn:'root' 
})

export class AdminGuard implements CanActivate {
    token:any;
    type_id:any;
    userData:any;
    constructor(private router:Router){}
    
    canActivate(){
        this.token=localStorage.getItem('token');
        if(!this.token){
            this.router.navigate(['login']);
        }
        this.userData=jwt_decode(this.token);
        this.type_id=this.userData.type_id;
        if(this.type_id!=4){
            this.router.navigate(['login']);
        }
        if(this.token&& this.type_id==4){
        
            return true;
        }
       
    }
}

