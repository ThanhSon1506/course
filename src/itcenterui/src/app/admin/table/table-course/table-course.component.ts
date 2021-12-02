import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/share/+state/course/course.model';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { environment } from 'src/environments/environment';
import { CrudService } from "../../../share/crud.service";
import { URL_COURSE, URL_IMG } from '../../constant/img.constant';
import { FromCourseEditComponent } from '../../from/from-course-edit/from-course-edit.component';



@Component({
  selector: 'app-table-course',
  templateUrl: './table-course.component.html',
  styleUrls: ['./table-course.component.scss']
})
export class TableCourseComponent implements AfterViewInit  {
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



  constructor(private service: CourseService, private matDialog: MatDialog) { }
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
     console.log(data);

    this.openDialog();
    // this.matDialog.open(FromAccountEditComponent);
    //  console.log('Row clicked: ', row.id);
    this.service.changeMessage(data);
    this.fetchAccount();
  
    // this.remove(row.id);
}
  fetchAccount() {  
    let resp=this.service.getCourse();
    resp.subscribe(report=>this.dataSource.data=report as unknown as Course[]);
  }  
  remove(id) {
    this.service.delete(id).subscribe(res => {
      this.fetchAccount();
    })
  }
}
