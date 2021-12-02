import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
//Import service
import {DataService} from '../../../share/data.service';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { FromAccountEditComponent } from 'src/app/admin/from/from-account-edit/from-account-edit.component';
import { FromComponent } from 'src/app/front/body/from/from.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  selectedMessage:any;
  token:any;
  userData:any;
  email:any;
  is_active:any;
  isAuthenticated=true;

  constructor(private dataService:DataService, private router:Router,private matDialog: MatDialog) { }

  ngOnInit(): void {
    try{
          // document.getElementById('login').style.display="none";
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.email=this.userData.email;
    this.is_active=this.userData.is_active;
    console.log(this.is_active);
    console.log(this.token);
    console.log(this.userData.email);
    console.log(this.userData);
    // document.getElementById('login').style.display="none";
        //Change value!
    // this.dataService.changeMessage("0");
    // this.dataService.currentMessage.subscribe(message =>
    //    (this.selectedMessage= message)); //<= Always get current value!
    }catch(e){
    this.isAuthenticated=false;

    }

  
    

  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  info(){
    this.matDialog.open(FromComponent);
  }
  // clickEvent(){
  //   console.log( window.location.href);
  // }
  //       navLinks = document.getElementById("navLinks");

  //       showMenu() {
  //            this.navLinks.style.right = "0";
  //           console.log("navLinks");
  //       }

  //       hideMenu() {
  //            this.navLinks.style.right = "-200px";
  //       }


}
