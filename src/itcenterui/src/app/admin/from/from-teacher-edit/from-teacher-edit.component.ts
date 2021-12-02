import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/share/+state/account/account.service';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { TeacherService } from 'src/app/share/+state/teacher/teacher.service';
import { TableCourseTeacherComponent } from '../../table/table-course-teacher/table-course-teacher.component';

@Component({
  selector: 'app-from-teacher-edit',
  templateUrl: './from-teacher-edit.component.html',
  styleUrls: ['./from-teacher-edit.component.scss']
})
export class FromTeacherEditComponent implements OnInit {

  from:FormGroup;
  submitted=false;
  data:any;
  flag = true;
  Teacher: any = [];
  checkName="^[a-zA-Z_-]{3,15}$";
  Account: any = [];
  
  constructor(private course:CourseService,private account:AccountService, private matDialog: MatDialog,
     private formBuilder:FormBuilder,private teacher:TeacherService,
     private toastr:ToastrService,public dialogRef: MatDialogRef<FromTeacherEditComponent>) { }
  
  ngOnInit() {
    this.createForm();
    this.fetchAccount();
    this.teacher.currentTeacher.subscribe(data =>
      (this.Teacher= data)); //<= Always get current value!
      console.log(this.Teacher);
    this.setDataInForm();
  }  

  setDataInForm(){  
    this.f.lastname.setValue(this.Teacher.lastname);
    this.f.firstname.setValue(this.Teacher.firstname);
    this.f.account_id.setValue(this.Teacher.account_id);
    this.f.phone.setValue(this.Teacher.phone);
    this.f.literacy.setValue(this.Teacher.literacy);
    this.f.date.setValue(this.Teacher.date);
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

  onSubmit(): void{
    this.submitted = true;
    if (this.from.invalid) {
      return;
    }

    this.teacher.update(this.from.value,this.Teacher.id).subscribe(res=>{
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
    return this.teacher.sameTeacherAccount().subscribe((data: {}) => {
      this.Account = data;
      this.Account.push(this.Teacher.account);
      try{
        this.f.account_id.setValue(this.Teacher.account.id);
        console.log("true"+this.Account);

      }catch(Exception){
        console.log(Exception);
        this.flag=false;
        console.log("flase"+this.Account);
      }
  

    })    
  }
  delete(){
    this.teacher.delete(this.Teacher.id).subscribe(res=>{
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

  deleteData():void{
    this.course.getCourseFindTeacher(this.Teacher.id).subscribe(res=>{
      this.data=res;
      console.log(res);
      if(this.data.status===0){
        this.teacher.delete(this.Teacher.id).subscribe(res=>{
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
          this.dialogRef.close();
        });
    
        
      } else{
        this.openDialog();
        this.teacher.changeTeacher(this.Teacher);
      }
  
    });
  
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(TableCourseTeacherComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width:"100%",
    });
  }

  onReset(): void {
    this.submitted = false;
    this.from.reset();
  }

}
