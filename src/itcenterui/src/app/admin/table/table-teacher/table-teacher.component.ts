import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Teacher } from 'src/app/share/+state/teacher/teacher.model';
import { TeacherService } from 'src/app/share/+state/teacher/teacher.service';
import { FromTeacherEditComponent } from '../../from/from-teacher-edit/from-teacher-edit.component';

@Component({
  selector: 'app-table-teacher',
  templateUrl: './table-teacher.component.html',
  styleUrls: ['./table-teacher.component.scss']
})
export class TableTeacherComponent implements AfterViewInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Teacher[];
  selectedData:any;
  displayedColumns: string[] =['id','lastname','firstname','date','phone','literacy','account_id','action'];
  dataSource = new MatTableDataSource<Teacher>(this.ELEMENT_DATA);  


  constructor(private service: TeacherService, private matDialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.service.currentTeacher.subscribe(data =>
       (this.selectedData= data)); //<= Always get current value!
    this.fetchTeacher()
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
  openDialog(): void {
    const dialogRef = this.matDialog.open(FromTeacherEditComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '789px'
    });
    this.fetchTeacher()

  }
  onRowClicked(data) {
     console.log(data);
    this.openDialog();
    this.service.changeTeacher(data);
    this.fetchTeacher();
}
  fetchTeacher() {
    let resp=this.service.getTeacher();
    resp.subscribe(report=>this.dataSource.data=report as unknown as Teacher[]);
    console.log(resp);
  }  
  remove(id) {
    this.service.delete(id).subscribe(res => {
      this.fetchTeacher();
    })
  }
}
