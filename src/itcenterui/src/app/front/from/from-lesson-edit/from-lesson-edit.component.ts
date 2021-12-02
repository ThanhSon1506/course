import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from 'src/app/share/+state/theme/theme.service';
import { URL_VIDEOS } from 'src/app/share/+state/video/video.constant';
import { VideoService } from 'src/app/share/+state/video/video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-from-lesson-edit',
  templateUrl: './from-lesson-edit.component.html',
  styleUrls: ['./from-lesson-edit.component.scss']
})
export class FromLessonEditComponent implements OnInit {

  
  from:FormGroup;
  submitted=false;
  data:any;
  file=false;
  fileSrc: string;
  progress = 0;
  File:any=[];
  Session:any;
  Video:any;
  url_videos=URL_VIDEOS;

  endPoint=environment.apiUrl;

  constructor( private theme:ThemeService,private video:VideoService,private toastr:ToastrService,
    private matDialog: MatDialog,private formBuilder:FormBuilder,  public dialogRef: MatDialogRef<FromLessonEditComponent>
    ) { }
  ngOnInit(): void {
    this.createForm();
    this.fetchSession();
    this.video.currentVideo.subscribe(data =>
      (this.Video= data)); //<= Always get current value!
      console.log(this.Video);
    this.setDataInForm();

  }

  setDataInForm():void{
    this.f.title.setValue(this.Video.title);
    this.f.description.setValue(this.Video.description);
    this.f.session_id.setValue(this.Video.session_id);
    this.f.url.setValue(this.Video.url);
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

        session_id: [
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

  // openDialog(): void {
  //   const dialogRef = this.matDialog.open(DialogTeacherCourseComponent, {
  //     backdropClass: 'cdk-overlay-transparent-backdrop',
  //     hasBackdrop: true,
  //     width: '789px'
  //   });

  // }
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
    const formData=new FormData();

    // if (this.from.invalid) {
    //   return;
    // }
    if(this.fileSrc!=null){
    formData.append("url",this.File,this.File.name);
    formData.append("title",this.from.get('title').value);
    formData.append("description",this.from.get('description').value);
    formData.append("session_id",this.from.get('session_id').value);
    this.video.createVideo(formData).subscribe(res=>{
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
    else{
      this.video.update(this.from.value,this.Video.id).subscribe(res=>{
      console.log("this.from.value"+this.from.value);

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
      });
      this.dialogRef.close("Thanks for using me!");

    }
    

    }
    changeLevel(data):void{
      console.log(data);
    }
    fetchSession() {
      return this.theme.getTheme().subscribe((data: {}) => {
        this.Session = data;
        this.f.session_id.setValue(1);
      })    
    }
    onReset(): void {
      this.submitted = false;
      this.from.reset();
    }
 delete(){
    this.video.delete(this.Video.id).subscribe(res=>{
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


}
