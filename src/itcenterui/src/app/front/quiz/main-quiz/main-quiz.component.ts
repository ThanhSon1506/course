import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Exam } from 'src/app/share/+state/exam/exam.model';
import { ExamService } from 'src/app/share/+state/exam/exam.service';
import { FromExamEditComponent } from '../from-exam-edit/from-exam-edit.component';

@Component({
  selector: 'app-main-quiz',
  templateUrl: './main-quiz.component.html',
  styleUrls: ['./main-quiz.component.scss']
})
export class MainQuizComponent implements  AfterViewInit{


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Exam[];
  selectedData:any;
  data:any;
  displayedColumns: string[] =['id','session_id','name','question_sum','request_percent','deadline','action'];
  dataSource = new MatTableDataSource<Exam>(this.ELEMENT_DATA);  


  constructor(private toastr:ToastrService,private service: ExamService, private matDialog: MatDialog) { }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.service.currentExam.subscribe(data =>
       (this.selectedData= data)); //<= Always get current value!
    this.fetchExam()
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
      width: '789px'
    });
    this.fetchExam()

  }
  onRowClicked(data) {
    this.service.changeExam(data);
    this.service.delete(data.id).subscribe(res=>{
      this.data=res;
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
    })
}
  fetchExam() {
    let resp=this.service.getExam();
    resp.subscribe(report=>this.dataSource.data=report as unknown as Exam[]);
    console.log(resp);
  }  
  // remove(id) {
  //   this.service.delete(id).subscribe(res => {
  //     this.fetchLevel();
  //   })
  // }
}
