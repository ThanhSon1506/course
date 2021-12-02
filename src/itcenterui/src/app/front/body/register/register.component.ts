import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/share/+state/account/account.service';
import jwt_decode from 'jwt-decode';
import Validation from 'src/app/admin/share/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
      username: [
        '',
        [
          Validators.pattern("^[a-z0-9_-]{8,15}$"),
          Validators.required
        ]
      ],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: [
        '',
        [
          Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,40}$"),
          Validators.required,
        ]
      ],
      confirmPassword: ['', Validators.required],
      is_active: ['1', Validators.required],
      type_id: ['', Validators.required]
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }
  ngOnInit() {
    this.loginForm();
    this.f.type_id.setValue(1);
    this.f.is_active.setValue(1);
  }

  get f(){
    return this.from.controls;
  }

  onSubmit(){
    this.submitted=true;
    if(this.from.invalid){
      return;
    }
    console.log(this.from.value);


    this.dataService.createUser(this.from.value).subscribe(res=>{
    this.data=res;

    if(this.data.status===1){
      this.router.navigate(['/login']);
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
}

