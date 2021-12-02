import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { VideoService } from 'src/app/share/+state/video/video.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FromLessonEditComponent } from '../../from/from-lesson-edit/from-lesson-edit.component';

@Component({
  selector: 'app-dialog-teacher-course',
  templateUrl: './dialog-teacher-course.component.html',
  styleUrls: ['./dialog-teacher-course.component.scss']
})
export class DialogTeacherCourseComponent implements OnInit {
  from:FormGroup;
  submitted=false;
  data:any;
  file=false;
  fileSrc: string;
  progress = 0;
  File:any=[];

  constructor( private video:VideoService,private toastr:ToastrService,private matDialog: MatDialog,private formBuilder:FormBuilder, public dialogRef: MatDialogRef<FromLessonEditComponent>) { }
  ngOnInit(): void {
    this.createForm();

  }
  createForm(){
    
    this.from = this.formBuilder.group(
      {
      
        title: [
          '',
          [
            Validators.required,
          ]
        ],
        description: [
          '',
          [
            Validators.required,
          ]
        ],
        url: [
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


  onFileChange(event) {
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      this.File=file;
        this.file=true;
        reader.onload = () => {
          
          this.fileSrc = reader.result as string;
        
          this.from.patchValue({
            fileSource: reader.result
          });
      
        };
      
    }
    this.File=event.target.files[0];
    console.log(this.File)
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(FromLessonEditComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '789px'
    });

  }
  returnFileSize(number) {
    if(number < 1024) {
      return number + 'bytes';
    } else if(number >= 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576) {
      return (number/1048576).toFixed(1) + 'MB';
    }
  }
  onSubmit(): void{
    this.submitted = true;
    this.progress=0;
    const formData=new FormData();

    if (this.from.invalid) {
      return;
    }
    formData.append("url",this.File,this.File.name);
    formData.append("title",this.from.get('title').value);
    formData.append("description",this.from.get('description').value);

    this.video.create(formData).subscribe(res=>{
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
      
    });
    this.dialogRef.close();

  }
}
