import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DialogLanguageComponent } from 'src/app/component/dialog-language/dialog-language.component';
import { Course } from 'src/app/share/+state/course/course.model';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { LanguageService } from 'src/app/share/+state/language/language.service';
import { environment } from 'src/environments/environment';
import { URL_COURSE, URL_IMG } from '../../constant/img.constant';

@Component({
  selector: 'app-table-course-del',
  templateUrl: './table-course-del.component.html',
  styleUrls: ['./table-course-del.component.scss']
})
export class TableCourseDelComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];

   ELEMENT_DATA !: Course[];
   dataSource = new MatTableDataSource<Course>(this.ELEMENT_DATA);  
  Language:any;
  displayedColumns: string[] = ['id','name','language_id','photo','price','action'];
  data: any;
  url_course=URL_COURSE;
  url_img=URL_IMG;
  endPoint=environment.apiUrl;


  constructor(private dialogRef:MatDialogRef<TableCourseDelComponent>,private service: CourseService, private toastr:ToastrService,private matDialog: MatDialog,private language:LanguageService) { }
  ngAfterViewInit(): void {


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.language.currentLanguage.subscribe(data =>
       (this.Language= data)); //<= Always get current value!
       console.log("language:"+this.Language.id);
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
    let resp=this.service.getCourseFindLanguage(this.Language.id);
    resp.subscribe(report=>this.dataSource.data=report as unknown as Course[]);
  }  
  deleteData(object):void{
    console.log("data-account:"+object.id);
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
  const dialogRef = this.matDialog.open(DialogLanguageComponent, {
    backdropClass: 'cdk-overlay-transparent-backdrop',
    hasBackdrop: true,
    width: '789px'
  });
  
}
}
