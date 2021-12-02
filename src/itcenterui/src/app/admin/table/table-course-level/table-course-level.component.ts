import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DialogLevelComponent } from 'src/app/component/dialog-level/dialog-level.component';
import { Course } from 'src/app/share/+state/course/course.model';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { LevelService } from 'src/app/share/+state/level/level.service';
@Component({
  selector: 'app-table-course-level',
  templateUrl: './table-course-level.component.html',
  styleUrls: ['./table-course-level.component.scss']
})
export class TableCourseLevelComponent implements AfterViewInit {

 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Course[];
   dataSource = new MatTableDataSource<Course>(this.ELEMENT_DATA);  
  Level:any;
  data:any;
  displayedColumns: string[] = ['id','name','level_id','photo','price','action'];



  constructor(private service: CourseService,private toastr:ToastrService ,private matDialog: MatDialog,private level:LevelService) { }
  ngAfterViewInit(): void {


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.level.currentLevel.subscribe(data =>
       (this.Level= data)); //<= Always get current value!
       console.log("level:"+this.Level.id);
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
    let resp=this.service.getCourseFindLevel(this.Level.id);
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
      } else{
        this.toastr.error(JSON.stringify(this.data.message),'Error',{
          timeOut:2000,
          progressBar:true,
        });
      }
    });
   
}
openDestroy():void{
  const dialogRef = this.matDialog.open(DialogLevelComponent, {
    backdropClass: 'cdk-overlay-transparent-backdrop',
    hasBackdrop: true,
    width: '789px'
  });
  
}

}
