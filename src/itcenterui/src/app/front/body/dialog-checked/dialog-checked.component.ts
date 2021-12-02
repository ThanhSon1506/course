import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { ProjectService } from 'src/app/share/+state/project/project.service';
import { URL_VIDEOS } from 'src/app/share/+state/video/video.constant';
import { VideoService } from 'src/app/share/+state/video/video.service';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-checked',
  templateUrl: './dialog-checked.component.html',
  styleUrls: ['./dialog-checked.component.scss']
})
export class DialogCheckedComponent implements OnInit {
  from:FormGroup;
  Course:any=[];
  submitted=false;
  data:any;
  Video:any=[];
  url_videos=URL_VIDEOS;
  token:any;
  userData:any;
  account_id:any;
  endPoint=environment.apiUrl;
  constructor(public dialogRef: MatDialogRef<DialogCheckedComponent>,private video:VideoService,
    private toastr:ToastrService,private project:ProjectService,private formBuilder:FormBuilder, private course:CourseService) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.account_id=this.userData.id;

    this.createForm();
    this.fetchCourse();
    this.video.currentVideo.subscribe(data =>
      (this.Video=data)); //<= Always get current value!
      console.log(this.Video);
    this.f.course_id.setValue(1);
    this.f.video_id.setValue(this.Video.id);
    this.f.teacher_id.setValue(this.account_id);
  }
  createForm(){
  
    this.from = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.pattern("^[+#0-9a-zA-Z_-\\s{0,1}]{3,100}$"),
          ]
        ],
        video_id:['', Validators.required],
        teacher_id:['', Validators.required],
        course_id: ['', Validators.required],
        end_date: ['', Validators.required],
        start_date: ['', Validators.required],
      },
    
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.from.controls;
  }
  changeCourse(e){
    console.log(e.target.value);
  }
  fetchCourse() {
    return this.course.getCourse().subscribe((data: {}) => {
      this.Course = data;
    })    
  }

  onSubmit(): void{
    
    this.submitted = true;
    if (this.from.invalid) {
      return;
    }

    this.project.create(this.from.value).subscribe(res=>{
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
    });
    this.dialogRef.close();


  }
}


