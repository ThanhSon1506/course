import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/share/+state/account/account.service';
import { StudentService } from 'src/app/share/+state/student/student.service';

@Component({
  selector: 'app-from-student-edit',
  templateUrl: './from-student-edit.component.html',
  styleUrls: ['./from-student-edit.component.scss']
})
export class FromStudentEditComponent implements OnInit {
  from:FormGroup;
  submitted=false;
  data:any;
  flag = true;
  Student: any = [];
  checkName="^[a-zA-Z_-]{3,15}$";
  Account: any = [];
  
  constructor(private account:AccountService, private matDialog: MatDialog,
     private formBuilder:FormBuilder,private student:StudentService,
     private toastr:ToastrService,public dialogRef: MatDialogRef<FromStudentEditComponent>) { }
  
  ngOnInit() {
    this.createForm();
    this.fetchAccount();
    this.student.currentStudent.subscribe(data =>
      (this.Student= data)); //<= Always get current value!
      console.log(this.Student);
    this.setDataInForm();
  }  

  setDataInForm(){  
    this.f.lastname.setValue(this.Student.lastname);
    this.f.firstname.setValue(this.Student.firstname);
    this.f.account_id.setValue(this.Student.account_id);
    this.f.phone.setValue(this.Student.phone);
    this.f.address.setValue(this.Student.address);
    this.f.date.setValue(this.Student.date);
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
        address: [
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

  onSubmit(): void{
    this.submitted = true;
    if (this.from.invalid) {
      return;
    }

    this.student.update(this.from.value,this.Student.id).subscribe(res=>{
      this.data=res;
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
      this.from.get('name').reset();
    });
    this.dialogRef.close("Thanks for using me!");

  }
  fetchAccount() {
    return this.student.sameStudentAccount().subscribe((data: {}) => {
      this.Account = data;
      this.Account.push(this.Student.account);
      try{
        this.f.account_id.setValue(this.Student.account.id);
        console.log("true"+this.Account);

      }catch(Exception){
        console.log(Exception);
        this.flag=false;
        console.log("flase"+this.Account);
      }
    })    
  }
  deleteData(){
    this.student.delete(this.Student.id).subscribe(res=>{
      this.data=res;
      if(this.data.status===1){
        this.toastr.success(JSON.stringify(this.data.message),'Success',{
          timeOut:2000,
          progressBar:true,
        });
      } else{
        this.toastr.error(JSON.stringify(this.data.message),'Error',{
          timeOut:2000,
          progressBar:true,
        });
      }
    });
    this.dialogRef.close("Thanks for using me!");
  }
  close() {
    this.dialogRef.close("Thanks for using me!");
  }

  onReset(): void {
    this.submitted = false;
    this.from.reset();
  }
}
