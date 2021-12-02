import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Video } from 'src/app/share/+state/video/video.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VideoService } from 'src/app/share/+state/video/video.service';
import {  URL_VIDEOS } from 'src/app/share/+state/video/video.constant';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DialogCourseClassComponent } from '../dialog-course-class/dialog-course-class.component';
import { FromCourseEditComponent } from 'src/app/admin/from/from-course-edit/from-course-edit.component';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { Course } from 'src/app/share/+state/course/course.model';
import { URL_COURSE, URL_IMG } from 'src/app/admin/constant/img.constant';
import jwt_decode from 'jwt-decode';
import { TeacherService } from 'src/app/share/+state/teacher/teacher.service';
import { FromListStudentComponent } from '../../from/from-list-student/from-list-student.component';

@Component({
  selector: 'app-main-teacher-course',
  templateUrl: './main-teacher-course.component.html',
  styleUrls: ['./main-teacher-course.component.scss']
})
export class MainTeacherCourseComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Course[];
   dataSource = new MatTableDataSource<Course>(this.ELEMENT_DATA);  
  selectedMessage:any;
  displayedColumns: string[] = ['id','name','category_id','level_id','language_id','photo','price','action'];
  url_course=URL_COURSE;
  url_img=URL_IMG;
  endPoint=environment.apiUrl;
  token:any;
  userData:any;
  account_id:any;
  teacher_id:any;
  Teacher:any=[];


  constructor(private teacher:TeacherService,private service: CourseService, private matDialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.account_id=this.userData.id;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.service.currentMessage.subscribe(message =>
       (this.selectedMessage= message)); //<= Always get current value!
    this.findTeacher();
       console.log(this.dataSource);
      console.log(this.endPoint);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
  openDialog(): void {
    const dialogRef = this.matDialog.open(FromCourseEditComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '982px'
    });
    this.findTeacher();

  }
  onRowClicked(data) {
     console.log(data);

    this.openDialog();
    // this.matDialog.open(FromAccountEditComponent);
    //  console.log('Row clicked: ', row.id);
    this.service.changeMessage(data);
    this.findTeacher();
    // this.remove(row.id);
}

listStudent(data: any) {
  this.service.changeMessage(data);
  const dialogRef = this.matDialog.open(FromListStudentComponent, {
    backdropClass: 'cdk-overlay-transparent-backdrop',
    hasBackdrop: true,
    width: '982px'
  });
}
findTeacher(){
  this.teacher.getTeacherFindAccount(this.account_id).subscribe(res=>{
    this.Teacher = res;
    this.teacher_id=this.Teacher[0].id;
    this.fetchAccount(this.teacher_id);
    console.log("this.Teacher[0].id"+this.teacher_id);  
  })
}

  fetchAccount(teacher_id) {  
    let resp=this.service.getTeacherTrue(teacher_id);
    resp.subscribe(report=>this.dataSource.data=report as unknown as Course[]);
  }  
  remove(id) {
    this.service.delete(id).subscribe(res => {
      // this.fetchAccount();
    })
  }

}
