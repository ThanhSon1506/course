import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { LanguageService } from 'src/app/share/+state/language/language.service';
import { TableCourseDelComponent } from '../../table/table-course-del/table-course-del.component';

@Component({
  selector: 'app-from-language-edit',
  templateUrl: './from-language-edit.component.html',
  styleUrls: ['./from-language-edit.component.scss']
})
export class FromLanguageEditComponent implements OnInit {

  from:FormGroup;
  submitted=false;
  data:any;
  flag = false;
  Language: any = [];
  checkName="^[a-zA-Z_-]{3,15}$";

  
  constructor(private course:CourseService, private matDialog: MatDialog,
     private formBuilder:FormBuilder,private language:LanguageService,private toastr:ToastrService,public dialogRef: MatDialogRef<FromLanguageEditComponent>) { }
  
  ngOnInit() {
    this.createForm();
    this.language.currentLanguage.subscribe(data =>
      (this.Language= data)); //<= Always get current value!
      console.log(this.Language);
    this.setDataInForm();
  }  

  setDataInForm(){  
    this.f.name.setValue(this.Language.name);
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

    this.language.update(this.from.value,this.Language.id).subscribe(res=>{
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
    const dialogRef = this.matDialog.open(TableCourseDelComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width:"100%",
    });
  }
  deleteData():void{
    this.course.getCourseFindLanguage(this.Language.id).subscribe(res=>{
      this.data=res;
      console.log(res);
      if(this.data.status===0){
        this.language.delete(this.Language.id).subscribe(res=>{
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
        this.language.changeLanguage(this.Language);
      }
  
    });


  
  }
  onReset(): void {
    this.submitted = false;
    this.from.reset();
  }


}
