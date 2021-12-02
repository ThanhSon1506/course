import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { URL_COURSE, URL_IMG } from 'src/app/admin/constant/img.constant';
import { Course } from 'src/app/share/+state/course/course.model';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { TeacherService } from 'src/app/share/+state/teacher/teacher.service';

@Component({
  selector: 'app-teacher-course-false',
  templateUrl: './teacher-course-false.component.html',
  styleUrls: ['./teacher-course-false.component.scss']
})
export class TeacherCourseFalseComponent implements AfterViewInit {

  
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
  Teacher:any=[];
  teacher_id:any;


  constructor(private teacher:TeacherService,private service: CourseService, private matDialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.account_id=this.userData.id;
    console.log(this.account_id);
    this.service.currentMessage.subscribe(message =>
       (this.selectedMessage= message)); //<= Always get current value!
    this.findTeacher(); 

      console.log(this.dataSource);
      console.log(this.endPoint);
      console.log("adsad"+this.teacher_id);
  }

  findTeacher(){
    this.teacher.getTeacherFindAccount(this.account_id).subscribe(res=>{
      this.Teacher = res;
      this.teacher_id=this.Teacher[0].id;
      this.fetchAccount(this.teacher_id);
      console.log("this.Teacher[0].id"+this.teacher_id);  
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
  // openDialog(): void {
  //   const dialogRef = this.matDialog.open(FromCourseEditComponent, {
  //     backdropClass: 'cdk-overlay-transparent-backdrop',
  //     hasBackdrop: true,
  //     width: '982px'
  //   });
  //   this.fetchAccount()

  // }
//   onRowClicked(data) {
//      console.log(data);

//     this.openDialog();
//     // this.matDialog.open(FromAccountEditComponent);
//     //  console.log('Row clicked: ', row.id);
//     this.service.changeMessage(data);
//     this.fetchAccount();
  
//     // this.remove(row.id);
// }
fetchAccountFalse() {  
  let resp=this.service.getCourseFalse();
  resp.subscribe(report=>this.dataSource.data=report as unknown as Course[]);
}  
  fetchAccount(teacher_id) {  
    let resp=this.service.getTeacher(teacher_id);
    resp.subscribe(report=>this.dataSource.data=report as unknown as Course[]);
  }  
  remove(id) {
    this.service.delete(id).subscribe(res => {
      this.fetchAccount(this.teacher_id);
    })
  }
}
