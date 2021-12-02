
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
import { Position } from 'src/app/share/+state/position/position.model';
import { PositionService } from 'src/app/share/+state/position/position.service';
import { FromPositionEditComponent } from '../../from/from-position-edit/from-position-edit.component';
@Component({
  selector: 'app-table-position',
  templateUrl: './table-position.component.html',
  styleUrls: ['./table-position.component.scss']
})
export class TablePositionComponent implements AfterViewInit  {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Position[];
  selectedData:any;
  displayedColumns: string[] =['id','name','action'];
  dataSource = new MatTableDataSource<Position>(this.ELEMENT_DATA);  


  constructor(private service: PositionService, private matDialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.service.currentPosition.subscribe(data =>
       (this.selectedData= data)); //<= Always get current value!
    this.fetchUsers()
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
  openDialog(): void {
    const dialogRef = this.matDialog.open(FromPositionEditComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '789px'
    });
    this.fetchUsers()

  }
  onRowClicked(data) {
     console.log(data);
    this.openDialog();
    this.service.changePosition(data);
    this.fetchUsers();
}
  fetchUsers() {
    let resp=this.service.getPosition();
    resp.subscribe(report=>this.dataSource.data=report as unknown as Position[]);
    console.log(resp);
  }  
  remove(id) {
    this.service.delete(id).subscribe(res => {
      this.fetchUsers();
    })
  }


  

}
