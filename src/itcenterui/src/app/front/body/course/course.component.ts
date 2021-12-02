import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { URL_COURSE, URL_IMG } from 'src/app/admin/constant/img.constant';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { environment } from 'src/environments/environment';
import {DataService} from '../../../share/data.service'
import { TeacherCourseComponent } from '../teacher-course/teacher-course.component';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent implements OnInit {
  
  selectedMessage:any;
  data:any;
  token:any;
  userData:any;
  type_id:any;
  url_course=URL_COURSE;
  url_img=URL_IMG;
  endPoint=environment.apiUrl;
  is_course=1;
  constructor(private _router: Router,private matDialog: MatDialog, private course:CourseService,private dataService:DataService) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.type_id=this.userData.type_id;
    this.dataService.currentMessage.subscribe(message =>
      (this.selectedMessage= message)); //<= Always get current value!
      console.log("this.is_course"+this.is_course);
      this.fetchCourse();

      
      console.log("this course"+this.data);
  }
openCourse(item){
 this._router.navigate(['course/detail',item.id]);
 this.course.changeMessage(item);
}
isCourse(number){
  this.is_course=number;
  switch (this.is_course) {
    case 1:
      this.fetchCourse();
      break;
    case 2: 
    this.fetchNewCourse();
      break;
    case 3:
      this.fetchAscCourse();
      break;
    case 4:
      this.fetchDescCourse();
      break;
    default:
      break;
  }
 
  console.log(this.is_course);
}
  fetchCourse(){
    this.course.getCourse().subscribe(res=>{
      this.data=res;
      console.log(this.data);
      //  console.log("student"+this.Account.id);

    });
  }

  fetchNewCourse(){
    this.course.indexUser().subscribe(res=>{
      this.data=res;
      console.log(this.data);
      //  console.log("student"+this.Account.id);

    });
  }
  fetchDescCourse(){
    this.course.indexDesc().subscribe(res=>{
      this.data=res;
      console.log(this.data);
      //  console.log("student"+this.Account.id);

    });
  }

  fetchAscCourse(){
    this.course.indexAsc().subscribe(res=>{
      this.data=res;
      console.log(this.data);
      //  console.log("student"+this.Account.id);

    });
  }


  openDialog(): void {
    const dialogRef = this.matDialog.open(TeacherCourseComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '789px'
    });
    
  }
  add(){
  this.selectedMessage++;
  this.dataService.changeMessage(this.selectedMessage);
  console.log(this.selectedMessage);
  }
}
