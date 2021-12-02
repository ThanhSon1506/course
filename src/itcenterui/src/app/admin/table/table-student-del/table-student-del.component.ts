import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/share/+state/account/account.service';
import { Student } from 'src/app/share/+state/student/student.model';
import { StudentService } from 'src/app/share/+state/student/student.service';

@Component({
  selector: 'app-table-student-del',
  templateUrl: './table-student-del.component.html',
  styleUrls: ['./table-student-del.component.scss']
})
export class TableStudentDelComponent implements AfterViewInit {

 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];

   ELEMENT_DATA !: Student[];
  Account:any;
  data: any;
  displayedColumns: string[] =['id','lastname','firstname','date','phone','address','account_id','action'];
  dataSource = new MatTableDataSource<Student>(this.ELEMENT_DATA);  

  constructor(private dialogRef:MatDialogRef<TableStudentDelComponent>,private service: StudentService, private toastr:ToastrService,
    private matDialog: MatDialog,private account:AccountService) { }
  ngAfterViewInit(): void {


    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    
    this.account.currentMessage.subscribe(data =>
       (this.Account= data)); //<= Always get current value!
       console.log("account:"+this.Account.id);
    this.fetchStudent();
      console.log(this.dataSource);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
 
  fetchStudent() {  
    let resp=this.service.getStudentFindAccount(this.Account.id);
    resp.subscribe(report=>this.dataSource.data=report as unknown as Student[]);
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
    this.fetchStudent();

      } else{
        this.toastr.error(JSON.stringify(this.data.message),'Error',{
          timeOut:2000,
          progressBar:true,
        });
      }
    });
    this.dialogRef.close();
}


}
