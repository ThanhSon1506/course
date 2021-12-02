import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { PositionService } from 'src/app/share/+state/position/position.service';
import { AccountService } from '../../../../app/share/+state/account/account.service';
import { Account } from 'src/app/share/+state/account/account.model';
import Validation from '../../share/validation';
import { ToastrService } from 'ngx-toastr';
import { Position } from 'src/app/share/+state/position/position.model';
@Component({
  selector: 'app-from-account',
  templateUrl: './from-account.component.html',
  styleUrls: ['./from-account.component.scss']
})
export class FromAccountComponent implements OnInit {

  from:FormGroup;
  submitted=false;
  data:any;
  hide = true;
  hide_2=true;
  flag = false;
  // email = new FormControl('', [Validators.required, Validators.email]);
  resetpassword;
  Position: any = [];

  Account:any =[];
  
  constructor(private position:PositionService,private formBuilder:FormBuilder,private account:AccountService,private toastr:ToastrService) { }
  
  ngOnInit() {
    console.log("id position",this.Position.id);
    this.fetchPosition();
    this.createForm();
  this.f.type_id.setValue(1);
  }  
  sendposition(e){
    console.log(e);
  }
 
  changePosition(e){
    console.log(e.target.value);
  }

  createForm(){
  
    this.from = this.formBuilder.group(
      {
        
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
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.from.controls;
  }

  onSubmit(): void{
    this.submitted = true;
    console.log(this.from.value);
    if (this.from.invalid) {
      return;
    }

    this.account.createUser(this.from.value).subscribe(res=>{
      this.data=res;
      if(this.data.status===1){
        this.toastr.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true,
        });
      } else{
        this.toastr.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true,
        });
      }
      this.submitted=false;
      this.from.get('username').reset();
      this.from.get('email').reset();
      this.from.get('password').reset();
      this.from.get('confirmPassword').reset();
      // this.from.get('type_id').reset()
      location.reload();
    });

  }

  onReset(): void {
    this.submitted = false;
    this.from.reset();
  }

  fetchPosition() {
      return this.position.getPosition().subscribe((data: {}) => {
        this.Position = data;
      })    
    }
    
    
}
