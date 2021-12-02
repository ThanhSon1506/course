import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  token:any;
  userData:any;
  email:any;
  username:any;
  constructor() { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.email=this.userData.email;
    this.username=this.userData.username;

    console.log(this.token);
    console.log(this.userData.username);
    console.log(this.userData);
  }

}
