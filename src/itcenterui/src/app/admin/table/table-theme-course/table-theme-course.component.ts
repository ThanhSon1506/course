import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DialogCourseComponent } from 'src/app/component/dialog-course/dialog-course.component';
import { CategoryService } from 'src/app/share/+state/category/category.service';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { Theme } from 'src/app/share/+state/theme/theme.model';
import { ThemeService } from 'src/app/share/+state/theme/theme.service';

@Component({
  selector: 'app-table-theme-course',
  templateUrl: './table-theme-course.component.html',
  styleUrls: ['./table-theme-course.component.scss']
})
export class TableThemeCourseComponent implements AfterViewInit {

 
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Theme[];
   dataSource = new MatTableDataSource<Theme>(this.ELEMENT_DATA);  

  Course:any;
  data:any;
  displayedColumns: string[] = ['id','name','course_id','action'];



  constructor(private dialogRef: MatDialogRef<TableThemeCourseComponent>,private service: ThemeService,private toastr:ToastrService ,private matDialog: MatDialog,private course:CourseService) { }
  ngAfterViewInit(): void {


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.course.currentMessage.subscribe(data =>
       (this.Course= data)); //<= Always get current value!
       console.log("Category:"+this.Course.id);
    this.fetchTheme()
      console.log(this.dataSource);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
 
  fetchTheme() {  
    let resp=this.service.getThemeFindCourse(this.Course.id);
    resp.subscribe(report=>this.dataSource.data=report as unknown as Theme[]);
  }  
  // remove(id) {
  //   this.service.delete(id).subscribe(res => {
  //     this.fetchCourse();
  //   })
  // }
  deleteData(object):void{
    console.log("data-account:"+object.id);
    this.fetchTheme();
    this.service.delete(object.id).subscribe(res=>{
      this.data=res;
      if(this.data.status===1){
        this.toastr.success(JSON.stringify(this.data.message),'Success',{
          timeOut:2000,
          progressBar:true,
        });
        this.fetchTheme();
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
  const dialogRef = this.matDialog.open(DialogCourseComponent, {
    backdropClass: 'cdk-overlay-transparent-backdrop',
    hasBackdrop: true,
    width: '789px'
  });
  
}

}
