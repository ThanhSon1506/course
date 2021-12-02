import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { ThemeService } from 'src/app/share/+state/theme/theme.service';
import { VideoService } from 'src/app/share/+state/video/video.service';
import { TableVideoThemeComponent } from '../../body/table-video-theme/table-video-theme.component';

@Component({
  selector: 'app-from-theme-edit',
  templateUrl: './from-theme-edit.component.html',
  styleUrls: ['./from-theme-edit.component.scss']
})
export class FromThemeEditComponent implements OnInit {

  from:FormGroup;
  submitted=false;
  data:any;
  flag = false;
  Course: any=[];
  Theme: any = [];
  checkName="^[a-zA-Z_-]{3,15}$";

  
  constructor(private course:CourseService,private video:VideoService, private matDialog: MatDialog,
     private formBuilder:FormBuilder,private theme:ThemeService,private toastr:ToastrService,
     public dialogRef: MatDialogRef<FromThemeEditComponent>) { }
  
  ngOnInit() {
    this.createForm();
    this.fetchCourse();
    this.theme.currentTheme.subscribe(data =>
      (this.Theme= data)); //<= Always get current value!
      console.log(this.Theme);
    this.setDataInForm();
  }  

  setDataInForm(){  
    this.f.name.setValue(this.Theme.name);
    this.f.course_id.setValue(this.Theme.course_id)
  }  
  createForm(){
 
    this.from = this.formBuilder.group(
      {
        
        name: [
          '',
          [
            Validators.required,
          ]
        ],
        course_id: ['', Validators.required],



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

    this.theme.update(this.from.value,this.Theme.id).subscribe(res=>{
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
    const dialogRef = this.matDialog.open(TableVideoThemeComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width:"100%",
    });
  }
  deleteData():void{
    this.video.getVideoFindTheme(this.Theme.id).subscribe(res=>{
      this.data=res;
      console.log(res);
      if(this.data.status===0){
        this.theme.delete(this.Theme.id).subscribe(res=>{
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
        this.theme.changeTheme(this.Theme);
      }
  
    });


  
  }
   fetchCourse() {
    return this.course.getCourse().subscribe((data: {}) => {
      this.Course = data;
    })    
  }

  onReset(): void {
    this.submitted = false;
    this.from.reset();
  }
  changeCourse(data):void{
    console.log(data);
  }

}
