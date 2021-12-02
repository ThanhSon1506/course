import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.scss']
})
export class FromComponent implements OnInit {
  token: string;
  userData: any;
  email: any;
  username:any;
  
  
  
  constructor(private router: Router,private dialogRef: MatDialogRef<FromComponent>) { }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.dialogRef.close("Thanks for using me!");
  }
  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.email=this.userData.email;
    this.username=this.userData.username;
   
  }

}

