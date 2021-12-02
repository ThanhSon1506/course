import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { URL_COURSE, URL_IMG } from 'src/app/admin/constant/img.constant';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { ThemeService } from 'src/app/share/+state/theme/theme.service';
import { URL_VIDEOS } from 'src/app/share/+state/video/video.constant';
import { VideoService } from 'src/app/share/+state/video/video.service';
import { environment } from 'src/environments/environment';
import Pusher from 'pusher-js';
import jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/share/+state/comment/comment.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateCourseComponent } from '../create-course/create-course.component';
import { ListStudentService } from 'src/app/share/+state/list_student/list-student.service';
import { StudentService } from 'src/app/share/+state/student/student.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  Course:any;
  course_id:any;
  Video:any=[];
  Theme:any=[];
  url_course=URL_COURSE;
  url_img=URL_IMG;
  url_videos=URL_VIDEOS;
  endPoint=environment.apiUrl;
  currentRate=0 ;
  username='username';
  messages:any=[];
  message:any;
  token:any;
  user:any;userData:any;id:any;
  from:FormGroup;
  submitted=false;
  data:any;
  data_2:any;
  data_3:any;
  Comment:any;
  formData=new FormData();
  Student:any;
  checked=false;


  constructor(private student:StudentService,private liststudent:ListStudentService,private matDialog: MatDialog,private toastr:ToastrService,private comment:CommentService,private formBuilder:FormBuilder,private http:HttpClient,private router: Router,private video:VideoService,private theme:ThemeService,private _router:ActivatedRoute,private course:CourseService) { }

  ngOnInit(): void {
    // this.course.currentMessage.subscribe(res=>{
    //   this.Course=res;
    // })

    this.token=localStorage.getItem('token'); 
    this.userData=jwt_decode(this.token);
    this.id=this.userData.id;

    // Pusher.logToConsole = true;

    // const pusher = new Pusher('2c71e5acd8fd7c858912', {
    //   cluster: 'ap1'
    // });

    // const channel = pusher.subscribe('course');
    // channel.bind('this.message', data => {
    //  this.messages.push(data);
    // });

    this.course_id=this._router.snapshot.params['id'];
    this.formData.append("course_id","2");
    console.log(this.course_id);
    // this.course.changeMessage(this.course_id);
    this.fetchCourse();
    // this.fetchTheme();
    this.fetchVideo();
    this.fetchComment();
    this.createForm();
    this.findStudent();
    // this.checkStudent();
    this.checkStudent_2();
    this.f.account_id.setValue(this.id);
    this.f.course_id.setValue(this.course_id);
    // console.log(this.checked);
  }

  findStudent(){
    this.student.getStudentFindAccount(this.userData.id).subscribe(res=>{
      this.Student=res;

    this.formData.append("student_id","8");

      console.log(this.Student[0].id);
    })
  }
  onSubmit():void{
    this.f.rate.setValue(this.currentRate);

    this.submitted = true;
    // if (this.from.invalid) {
    //   return;
    // }
    console.log("asdasd"+this.from.value);
    this.comment.create(this.from.value).subscribe(res=>{
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
      // this.from.get('name').reset();
      this.fetchComment();
    });
  }
  checkStudent(){
    console.log(this.formData);
    this.liststudent.check(this.formData).subscribe(res=>{
      // this.data_2=res;
      console.log(res);
    });
  }
  checkStudent_2(){

    this.liststudent.index().subscribe(res=>{
      this.data_3=res;

      // this.data_3.forEach(function(value){
      //   // console.log(value.course_id);
      //   console.log(checkCourse);

      //   if(value.course_id==this.course_id&&value.student_id==this.Student[0].id){
      //     console.log(value.course_id==this.course_id);
      //     this.checked=true;  
      //   }
      // });
      for (let item in this.data_3) {
        if(this.data_3[item].course_id==this.course_id&&this.data_3[item].student_id==this.Student[0].id){
          this.checked=true;
        }
      }
    
    })
  }

  opendialog(){
    const dialogRef = this.matDialog.open(CreateCourseComponent,   {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '982px'
    });
    
  }
  fetchComment(){
    this.comment.index(this.course_id).subscribe(res=>{
      this.Comment=res;
    })
  }
  fetchCourse(){
    this.course.findCourse(this.course_id).subscribe(res=>{
      this.Course=res;
      // console.log("asdasd"+this.Course);
    })
  }

  fetchVideo(){
    this.video.getVideo().subscribe(res=>{
      this.Video=res;
      // console.log("dasdas"+this.Video);
    })
  }


  createForm(){

    
    this.from = this.formBuilder.group(
      {
      
        account_id: [
          '',
          [
            Validators.required,
          ]
        ],
        course_id: [
          '',
          [
            Validators.required,
          ]
        ],
        message: [
          '',
          [ 
            Validators.required,
          ]
        ],

        rate: [
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


}
