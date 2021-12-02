import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/share/+state/account/account.model';
// import { DataService } from '../../../../app/share/+state/account/account.service';
import { PositionService } from 'src/app/share/+state/position/position.service';
import { AccountService } from 'src/app/share/+state/account/account.service';
import Validation from '../../share/validation';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TableStudentDelComponent } from '../../table/table-student-del/table-student-del.component';
import { TableTeacherDelComponent } from '../../table/table-teacher-del/table-teacher-del.component';
import { StudentService } from 'src/app/share/+state/student/student.service';
import { TeacherService } from 'src/app/share/+state/teacher/teacher.service';
@Component({
  selector: 'app-from-account-edit',
  templateUrl: './from-account-edit.component.html',
  styleUrls: ['./from-account-edit.component.scss']
})
export class FromAccountEditComponent implements OnInit {
  // posities = ['Student','Teacher'];
  from:FormGroup;
  // Position:any = [];
  submitted=false;
  // data:any;
  data:any;
  hide = true;
  hide_2=true;
  flag = false;

  resetpassword;
  Position: any = [];
  Account:any =[];

  
  constructor(private teacher:TeacherService,private student:StudentService,private matDialog: MatDialog,private position:PositionService, private formBuilder:FormBuilder,private account:AccountService,
    private toastr:ToastrService,public dialogRef: MatDialogRef<FromAccountEditComponent>) {
     }
  
  ngOnInit() {
    
    this.createForm();
    this.fetchPosition();
    this.account.currentMessage.subscribe(message =>
      (this.Account= message)); //<= Always get current value!
      console.log(this.Account);
      this.setDataInForm();
  
  }  

  changePosition(e){
    console.log(e);
  }
  fetchPosition(){
    return this.position.getPosition().subscribe((data: {}) => {
      this.Position=data;
    })
  }
  tranckByFunc(index, item){
    if(item.id==this.Account)
    return item;
    return undefined;
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
      
        is_active: ['1', Validators.required],
        type_id: ['', Validators.required]
      },
    
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.from.controls;
  }
  setDataInForm(){  
    this.f.username.setValue(this.Account.username);
    this.f.email.setValue(this.Account.email);
    this.f.type_id.setValue(this.Account.type_id);  
    this.f.is_active.setValue(1);
  }  
  onSubmit(): void{

    this.submitted = true;
    console.log(this.from.value);
    if (this.from.invalid) {
      return;
    }

 
    this.account.updateUsers(this.from.value,this.Account.id).subscribe(res=>{
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

  }
  
  openDialogStudent(): void {
    const dialogRef = this.matDialog.open(TableStudentDelComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '982px'
    });
  }

  openDialogTeacher(): void {
    const dialogRef = this.matDialog.open(TableTeacherDelComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '982px'
    });
  }

  deleteData(){

    switch(this.Account.type_id) { 
      case 1: { 
         this.student.getStudentFindAccount(this.Account.id).subscribe(res=>{
           this.data=res;
           if(this.data.status===0){
            this.account.deleteUser(this.Account.id).subscribe(res=>{
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
           else{
             this.openDialogStudent();
           }
         });
         break; 
      } 
      case 2: { 
        this.teacher.getTeacherFindAccount(this.Account.id).subscribe(res=>{
          this.data=res;
          if(this.data.status===0){
           this.account.deleteUser(this.Account.id).subscribe(res=>{
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
          else{
            this.openDialogTeacher();
          }
        });
        break; 
         break; 
      } 
      default: { 
         break; 
      } 
   }
   

    
  }
  close() {
    this.dialogRef.close("Thanks for using me!");
  }

 
}
