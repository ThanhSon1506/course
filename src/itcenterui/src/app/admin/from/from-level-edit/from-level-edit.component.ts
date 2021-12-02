import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { LevelService } from 'src/app/share/+state/level/level.service';
import { TableCourseLevelComponent } from '../../table/table-course-level/table-course-level.component';

@Component({
  selector: 'app-from-level-edit',
  templateUrl: './from-level-edit.component.html',
  styleUrls: ['./from-level-edit.component.scss']
})
export class FromLevelEditComponent implements OnInit {

  
  from:FormGroup;
  submitted=false;
  data:any;
  flag = false;
  Level: any = [];
  checkName="^[a-zA-Z_-]{3,15}$";

  
  constructor(private course:CourseService, private matDialog: MatDialog,
     private formBuilder:FormBuilder,private level:LevelService,private toastr:ToastrService,public dialogRef: MatDialogRef<FromLevelEditComponent>) { }
  
  ngOnInit() {
    this.createForm();
    this.level.currentLevel.subscribe(data =>
      (this.Level= data)); //<= Always get current value!
      console.log(this.Level);
    this.setDataInForm();
  }  

  setDataInForm(){  
    this.f.name.setValue(this.Level.name);
  }  
  createForm(){
 
    this.from = this.formBuilder.group(
      {
        
        name: [
          '',
          [
            Validators.pattern(this.checkName),
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

    this.level.update(this.from.value,this.Level.id).subscribe(res=>{
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
  openDialog(): void {
    const dialogRef = this.matDialog.open(TableCourseLevelComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width:"100%",
    });
  }
  deleteData():void{
    this.course.getCourseFindLevel(this.Level.id).subscribe(res=>{
      this.data=res;
      console.log(res);
      if(this.data.status===0){
        this.level.delete(this.Level.id).subscribe(res=>{
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
        this.level.changeLevel(this.Level);
      }
  
    });
  
  }
  onReset(): void {
    this.submitted = false;
    this.from.reset();
  }



}
