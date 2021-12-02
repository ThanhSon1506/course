import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/share/+state/course/course.model';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { environment } from 'src/environments/environment';
import { URL_COURSE, URL_IMG } from '../../constant/img.constant';
import { FromCourseEditComponent } from '../../from/from-course-edit/from-course-edit.component';

@Component({
  selector: 'app-table-course-false',
  templateUrl: './table-course-false.component.html',
  styleUrls: ['./table-course-false.component.scss']
})
export class TableCourseFalseComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Course[];
   dataSource = new MatTableDataSource<Course>(this.ELEMENT_DATA);  
  selectedMessage:any;
  displayedColumns: string[] = ['id','name','category_id','level_id','language_id','teacher_id','photo','price','action'];
  url_course=URL_COURSE;
  url_img=URL_IMG;
  endPoint=environment.apiUrl;
  course:any;


  constructor(private toastr:ToastrService,private service: CourseService, private matDialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.service.currentMessage.subscribe(message =>
       (this.selectedMessage= message)); //<= Always get current value!
    this.fetchAccount();
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
    this.fetchAccount()

  }
  onRowClicked(data) {
  this.service.swap(data.id).subscribe(res=>{
    this.course=res;
    if(this.course.status===1){
      this.toastr.success(JSON.stringify(this.course.message),JSON.stringify(this.course.code),{
        timeOut:2000,
        progressBar:true,
      });
    } else{
      this.toastr.error(JSON.stringify(this.course.message),JSON.stringify(this.course.code),{
        timeOut:2000,
        progressBar:true,
      });
    }
    this.fetchAccount();

  })
}
  fetchAccount() {  
    let resp=this.service.getCourseFalse();
    resp.subscribe(report=>this.dataSource.data=report as unknown as Course[]);
  }  
  remove(id) {
    this.service.delete(id).subscribe(res => {
      this.fetchAccount();
    })
  }

}
