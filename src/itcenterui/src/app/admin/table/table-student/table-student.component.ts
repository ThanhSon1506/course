import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/share/+state/student/student.model';
import { StudentService } from 'src/app/share/+state/student/student.service';
import { FromStudentEditComponent } from '../../from/from-student-edit/from-student-edit.component';

@Component({
  selector: 'app-table-student',
  templateUrl: './table-student.component.html',
  styleUrls: ['./table-student.component.scss']
})
export class TableStudentComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Student[];
  selectedData:any;
  displayedColumns: string[] =['id','lastname','firstname','date','phone','address','account_id','action'];
  dataSource = new MatTableDataSource<Student>(this.ELEMENT_DATA);  


  constructor(private service: StudentService, private matDialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.service.currentStudent.subscribe(data =>
       (this.selectedData= data)); //<= Always get current value!
    this.fetchStudent()
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
  openDialog(): void {
    const dialogRef = this.matDialog.open(FromStudentEditComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '789px'
    });
    this.fetchStudent()

  }
  onRowClicked(data) {
     console.log(data);
    this.openDialog();
    this.service.changeStudent(data);
    this.fetchStudent();
}
  fetchStudent() {
    let resp=this.service.getStudent();
    resp.subscribe(report=>this.dataSource.data=report as unknown as Student[]);
    console.log(resp);
  }  
  remove(id) {
    this.service.delete(id).subscribe(res => {
      this.fetchStudent();
    })
  }
}
