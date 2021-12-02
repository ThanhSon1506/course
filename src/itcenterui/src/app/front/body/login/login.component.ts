import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Form, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { AccountService } from '../../../../app/share/+state/account/account.service';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name: string;
  from:FormGroup;
  submitted=false;
  data:any;
  token:any;
  userData: any;
  type_id: any;
  
  constructor(public dialog: MatDialog, private dataService:AccountService,private toastr:ToastrService,
    private formBuilder:FormBuilder, private router:Router) {}
  
  loginForm(){

    this.from=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    });
  }
  ngOnInit() {
    this.loginForm();
  }

  get f(){
    return this.from.controls;
  }

  onSubmit(){
    this.submitted=true;
    if(this.from.invalid){
      return;
    }


    this.dataService.login(this.from.value).subscribe(res=>{
    this.data=res;
    // this.token=localStorage.getItem('token');
    //  console.log(res);
    if(this.data.status===1){
      this.token=this.data.data.token;
      localStorage.setItem('token',this.token);
      this.userData=jwt_decode(this.token);
      this.type_id=this.userData.type_id;
      switch(this.type_id){
        case 1:{
          console.log("user");
          this.router.navigate(['/']);
          break;
        }
        case 2:{
          console.log("teacher");
          this.router.navigate(['/course/teacher']);
          break;
        }
        case 3:{
          console.log("staff");
          this.router.navigate(['/']);
          break;
        }
        case 4:{
          this.router.navigate(['/admin']);
          console.log("admin");
          break;
        }

      }

      this.toastr.success(JSON.stringify(this.data.message),"Success",{
        timeOut:2000,
        progressBar:true
      });
    }else if(this.data.status===0){
      this.toastr.error(JSON.stringify(this.data.message),"Error",{
        timeOut:2000,
        progressBar:true
      })

    }
    })
  }
  // openDialog() {
  //   this.dialog.open(LoginDialog, {
  //     width: '250px',
  //     data: {name: this.name}
  //   });
  // }

  
}

