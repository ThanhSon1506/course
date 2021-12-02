import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DialogTeacherComponent } from 'src/app/component/dialog-teacher/dialog-teacher.component';
import { Course } from 'src/app/share/+state/course/course.model';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { TeacherService } from 'src/app/share/+state/teacher/teacher.service';
import { environment } from 'src/environments/environment';
import { URL_COURSE, URL_IMG } from '../../constant/img.constant';

@Component({
  selector: 'app-table-course-teacher',
  templateUrl: './table-course-teacher.component.html',
  styleUrls: ['./table-course-teacher.component.scss']
})
export class TableCourseTeacherComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Course[];
   dataSource = new MatTableDataSource<Course>(this.ELEMENT_DATA);  
  url_course=URL_COURSE;
  url_img=URL_IMG;
  endPoint=environment.apiUrl;
  Teacher:any;
  data:any;
  displayedColumns: string[] = ['id','name','teacher_id','photo','price','action'];



  constructor(private dialogRef: MatDialogRef<TableCourseTeacherComponent>,
    private service: CourseService,private toastr:ToastrService ,
    private matDialog: MatDialog,private teacher:TeacherService) { }
  ngAfterViewInit(): void {


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.teacher.currentTeacher.subscribe(data =>
       (this.Teacher= data)); //<= Always get current value!
       console.log("Teacher:"+this.Teacher.id);
    this.fetchCourse()
      console.log(this.dataSource);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
 
  fetchCourse() {  
    let resp=this.service.getCourseFindTeacher(this.Teacher.id);
    resp.subscribe(report=>this.dataSource.data=report as unknown as Course[]);
  }  
  // remove(id) {
  //   this.service.delete(id).subscribe(res => {
  //     this.fetchCourse();
  //   })
  // }
  deleteData(object):void{
    console.log("data-account:"+object.id);
    this.fetchCourse();
    this.service.delete(object.id).subscribe(res=>{
      this.data=res;
      if(this.data.status===1){
        this.toastr.success(JSON.stringify(this.data.message),'Success',{
          timeOut:2000,
          progressBar:true,
        });
        this.fetchCourse();
      } else{
        this.toastr.error(JSON.stringify(this.data.message),'Error',{
          timeOut:2000,
          progressBar:true,
        });
      }
    });
    this.dialogRef.close();
}

openDestroy():void{
  const dialogRef = this.matDialog.open(DialogTeacherComponent, {
    backdropClass: 'cdk-overlay-transparent-backdrop',
    hasBackdrop: true,
    width: '789px'
  });
}

}
