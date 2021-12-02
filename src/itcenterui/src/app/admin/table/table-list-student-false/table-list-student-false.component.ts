import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ListStudent } from 'src/app/share/+state/list_student/list-student.model';
import { ListStudentService } from 'src/app/share/+state/list_student/list-student.service';

@Component({
  selector: 'app-table-list-student-false',
  templateUrl: './table-list-student-false.component.html',
  styleUrls: ['./table-list-student-false.component.scss']
})
export class TableListStudentFalseComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: ListStudent[];
  selectedData:any;
  listStudent:any;
  displayedColumns: string[] =['id','name','lastname','firstname','phone','price','action'];
  dataSource = new MatTableDataSource<ListStudent>(this.ELEMENT_DATA);  


  constructor(private toastr:ToastrService,private service: ListStudentService, private matDialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.service.currentListStudent.subscribe(data =>
    //    (this.selectedData= data)); //<= Always get current value!
    this.fetchUsers()
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
  // openDialog(): void {
  //   const dialogRef = this.matDialog.open(FromListStudentEditComponent, {
  //     backdropClass: 'cdk-overlay-transparent-backdrop',
  //     hasBackdrop: true,
  //     width: '789px'
  //   });
  //   this.fetchUsers()

  // }
  onRowClicked(data) {
    this.service.swap(data.id).subscribe(res=>{
      this.listStudent=res;
      if(this.listStudent.status===1){
        this.toastr.success(JSON.stringify(this.listStudent.message),JSON.stringify(this.listStudent.code),{
          timeOut:2000,
          progressBar:true,
        });
      } else{
        this.toastr.error(JSON.stringify(this.listStudent.message),JSON.stringify(this.listStudent.code),{
          timeOut:2000,
          progressBar:true,
        });
      }
      this.fetchUsers();
    })
  }
  fetchUsers() {
    let resp=this.service.index_false();
    resp.subscribe(report=>this.dataSource.data=report as unknown as ListStudent[]);
    console.log(resp);
  }  
  remove(id) {
    this.service.delete(id).subscribe(res => {
      this.fetchUsers();
    })
  }

}
