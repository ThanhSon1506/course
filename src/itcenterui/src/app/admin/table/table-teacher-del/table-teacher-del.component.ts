import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/share/+state/account/account.service';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { Teacher } from 'src/app/share/+state/teacher/teacher.model';
import { TeacherService } from 'src/app/share/+state/teacher/teacher.service';
import { TableCourseTeacherComponent } from '../table-course-teacher/table-course-teacher.component';

@Component({
  selector: 'app-table-teacher-del',
  templateUrl: './table-teacher-del.component.html',
  styleUrls: ['./table-teacher-del.component.scss']
})
export class TableTeacherDelComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Teacher[];

   ELEMENT_DATA !: Teacher[];
  Account:any;
  data: any;
  displayedColumns: string[] =['id','lastname','firstname','date','phone','literacy','account_id','action'];  
  dataSource = new MatTableDataSource<Teacher>(this.ELEMENT_DATA);  

  constructor(private teacher:TeacherService,private course:CourseService,private dialogRef:MatDialogRef<TableTeacherDelComponent>,private service: TeacherService, private toastr:ToastrService,
    private matDialog: MatDialog,private account:AccountService) { }
  ngAfterViewInit(): void {


    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    
    this.account.currentMessage.subscribe(data =>
       (this.Account= data)); //<= Always get current value!
       console.log("account:"+this.Account.id);
    this.fetchTeacher();
      console.log(this.dataSource);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
 
  fetchTeacher() {  
    let resp=this.service.getTeacherFindAccount(this.Account.id);
    resp.subscribe(report=>this.dataSource.data=report as unknown as Teacher[]);
  }  
  delete(object):void{
    console.log("data-account:"+object.id);
    this.service.delete(object.id).subscribe(res=>{
      this.data=res;
      if(this.data.status===1){
        this.toastr.success(JSON.stringify(this.data.message),'Success',{
          timeOut:2000,
          progressBar:true,
        });
    this.fetchTeacher();

      } else{
        this.toastr.error(JSON.stringify(this.data.message),'Error',{
          timeOut:2000,
          progressBar:true,
        });
      }
    });
    this.dialogRef.close();
}

deleteData(element):void{
  this.course.getCourseFindTeacher(element.id).subscribe(res=>{
    this.data=res;
    console.log(res);
    if(this.data.status===0){
      this.teacher.delete(element.id).subscribe(res=>{
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
        this.dialogRef.close();
      });
  
      
    } else{
      this.openDialog();
      this.teacher.changeTeacher(element);
    }

  });

}

openDialog(): void {
  const dialogRef = this.matDialog.open(TableCourseTeacherComponent, {
    backdropClass: 'cdk-overlay-transparent-backdrop',
    hasBackdrop: true,
    width:"100%",
  });
}
}
