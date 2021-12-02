import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import jwt_decode from 'jwt-decode';
import { FromComponent } from '../../body/from/from.component';

@Component({
  selector: 'app-user-wrapper',
  templateUrl: './user-wrapper.component.html',
  styleUrls: ['./user-wrapper.component.scss']
})
export class UserWrapperComponent implements OnInit {

  token:any;
  userData:any;
  email:any;
  username:any;
  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.email=this.userData.email;
    this.username=this.userData.username;

    console.log(this.token);
    console.log(this.userData.username);
    console.log(this.userData);
  }

  info(){
    this.matDialog.open(FromComponent);
  }
}
