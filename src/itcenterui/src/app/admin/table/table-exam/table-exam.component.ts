import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FromExamEditComponent } from 'src/app/front/quiz/from-exam-edit/from-exam-edit.component';
import { Exam } from 'src/app/share/+state/exam/exam.model';
import { ExamService } from 'src/app/share/+state/exam/exam.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table-exam',
  templateUrl: './table-exam.component.html',
  styleUrls: ['./table-exam.component.scss']
})
export class TableExamComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Exam[];
   dataSource = new MatTableDataSource<Exam>(this.ELEMENT_DATA);  
  selectedMessage:any;
  displayedColumns: string[] = ['id','teacher_id','session_id','name','question_sum','request_percent','deadline','action'];

  endPoint=environment.apiUrl;



  constructor(private service: ExamService, private matDialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;``
    this.dataSource.sort = this.sort;
    this.service.currentExam.subscribe(message =>
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
    const dialogRef = this.matDialog.open(FromExamEditComponent, {
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
    this.service.changeExam(data);
    this.fetchAccount();
  
    // this.remove(row.id);
}
  fetchAccount() {  
    let resp=this.service.getExam();
    resp.subscribe(report=>this.dataSource.data=report as unknown as Exam[]);
  }  
  remove(id) {
    this.service.delete(id).subscribe(res => {
      this.fetchAccount();
    })
  }

}
