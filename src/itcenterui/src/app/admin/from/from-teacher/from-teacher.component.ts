import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/share/+state/account/account.service';
import { TeacherService } from 'src/app/share/+state/teacher/teacher.service';
import { FromAccountComponent } from '../from-account/from-account.component';

@Component({
  selector: 'app-from-teacher',
  templateUrl: './from-teacher.component.html',
  styleUrls: ['./from-teacher.component.scss']
})
export class FromTeacherComponent implements OnInit {


  from:FormGroup;
  submitted=false;
  data:any;
  // checkName="^[a-zA-Z_-]{3,15}$";
  hide = true;
  hide_2=true;
  flag = true;
  resetpassword;
  Teacher: any = [];
  Account:any=[];
  iddropaccount:any;  

  
  

  
  constructor( private matDialog: MatDialog,private account: AccountService,private formBuilder:FormBuilder,
    private teacher:TeacherService,private toastr:ToastrService) { }
  
  ngOnInit() {
   

    this.createForm();
    this.fetchAccount();    
    // document.getElementById('account_id_1').style.display="none";
  
  }  

  changeAccount(e){
    console.log(e.target.value);
  }
  createForm(){
    
    this.from = this.formBuilder.group(
      {
        lastname: [
          '',
          [
            Validators.required,
          ]
        ],
        firstname: [
          '',
          [
            Validators.required,
          ]
        ],
        date: [
          '',
          [
            Validators.required,
          ]
        ],
        phone: [
          '',
          [
            Validators.required,
          ]
        ],
        literacy: [
          '',
          [
            Validators.required,
          ]
        ],
        account_id: [
          '',
          [ 
            Validators.required,
          ]
        ],        

      },
     
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.from.controls;
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(FromAccountComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '789px'
    });

  }
  fetchAccount() {
    return this.teacher.sameTeacherAccount().subscribe((data: {}) => {
      this.Account = data;
      try{
        this.f.account_id.setValue(this.Account[0].id);
        console.log("true account:"+this.Account);

      }catch(Exception){
        console.log(Exception);
        this.flag=false;
        console.log("flase account"+this.Account);
      }
  

    })    
  }
  
  idDropAccount(){
    return this.account.idDropAccount().subscribe((data: {}) => {
      this.iddropaccount = data;
    })    
  }

  onSubmit(): void{
    this.submitted = true;
    if (this.from.invalid) {
      return;
    }

    this.teacher.create(this.from.value).subscribe(res=>{
      this.data=res;
      console.log("this.from.value"+this.from.value);
      console.log(res);
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
      this.from.get('lastname').reset();
      this.from.get('firstname').reset();
      this.from.get('date').reset();
      this.from.get('literacy').reset();
      this.from.get('phone').reset();
      this.from.get('account_id').reset();
      this.fetchAccount();
    });

  }

  onReset(): void {
    this.submitted = false;
    this.from.reset();
  }


}
