import { Injectable } from "@angular/core";
import {CanActivate,Route, Router} from "@angular/router";
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn:'root' 
})

export class AuthGuard implements CanActivate {

    constructor(private router:Router){}
    token:any;
    canActivate(){
        this.token=localStorage.getItem('token');
        if(this.token){
    
            return true;

        }
        else{
        this.router.navigate(['login']);
        }
    }
}



