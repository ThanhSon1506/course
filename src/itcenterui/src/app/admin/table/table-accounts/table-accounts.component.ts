import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { report } from 'process';
import { BehaviorSubject, Subject } from 'rxjs';
import { Account } from '../../../../app/share/+state/account/account.model';
// import { AccountService } from 'src/app/share/+state/account/account.service';
import { AccountService } from '../../../../app/share/+state/account/account.service';

import { FromAccountEditComponent } from '../../from/from-account-edit/from-account-edit.component';
import { FromAccountStudentComponent } from '../../from/from-account-student/from-account-student.component';
// import { Student } from 'src/app/share/+state/student/student.model';
// import { CrudService } from "../../../share/crud.service";

@Component({
  selector: 'app-table-accounts',
  templateUrl: './table-accounts.component.html',
  styleUrls: ['./table-accounts.component.scss']
})
export class TableAccountsComponent implements AfterViewInit  {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Account[];
   dataSource = new MatTableDataSource<Account>(this.ELEMENT_DATA);  
  selectedMessage:any;
  displayedColumns: string[] = ['id','username','email','type_id','action'];



  constructor(private service: AccountService, private matDialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.service.currentMessage.subscribe(message =>
       (this.selectedMessage= message)); //<= Always get current value!
    this.fetchUsers()
      console.log(this.dataSource);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
  openDialog(): void {
    const dialogRef = this.matDialog.open(FromAccountEditComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '789px'
    });
    this.fetchUsers()

  }
  openDialogClient(): void {
    const dialogRef = this.matDialog.open(FromAccountStudentComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '789px'
    });
    
  }
  clickUsername(data){
    console.log(data);

    this.openDialogClient();
    // this.matDialog.open(FromAccountEditComponent);
    //  console.log('Row clicked: ', row.id);
    this.service.changeMessage(data);
    this.fetchUsers();
  
    // this.remove(row.id);
  }
  onRowClicked(data) {
     console.log(data);

    this.openDialog();
    // this.matDialog.open(FromAccountEditComponent);
    //  console.log('Row clicked: ', row.id);
    this.service.changeMessage(data);
    this.fetchUsers();
  
    // this.remove(row.id);
}
  fetchUsers() {  
    let resp=this.service.getUsers();
    resp.subscribe(report=>this.dataSource.data=report as unknown as Account[]);
  }  
  remove(id) {
    this.service.delete(id).subscribe(res => {
      this.fetchUsers();
    })
  }


  

}
