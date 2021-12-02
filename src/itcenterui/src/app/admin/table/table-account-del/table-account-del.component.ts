import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { report } from 'process';
import { Account } from 'src/app/share/+state/account/account.model';
// import { AccountService } from 'src/app/share/+state/account/account.service';
import { AccountService } from 'src/app/share/+state/account/account.service';
import { ToastrService } from 'ngx-toastr';
import { PositionService } from 'src/app/share/+state/position/position.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/component/dialog/dialog.component';

@Component({
  selector: 'app-table-account-del',
  templateUrl: './table-account-del.component.html',
  styleUrls: ['./table-account-del.component.scss']
})
export class TableAccountDelComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Account[];
  displayedColumns: string[] = ['id', 'username', 'email','type_id','action'];
  dataSource = new MatTableDataSource<any>()
  data: any;
  Position: any;
  object:any;
  constructor(private matDialog: MatDialog,private account: AccountService,private toastr:ToastrService,private position:PositionService,public dialogRef: MatDialogRef<TableAccountDelComponent>) { }

  ngAfterViewInit(): void  {


    this.position.currentPosition.subscribe(data =>
      (this.Position= data)); //<= Always get current value!
      console.log("id position");
      console.log(this.Position);
    console.log(this.dataSource);
    this.fetchUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  fetchUsers() {
      let resp=this.account.getUsersFindPosition(this.Position.id);
      resp.subscribe(report=>this.dataSource.data=report as unknown as Account[]);
    }  

  deleteData(object):void{
    this.account.deleteUser(object.id).subscribe(res=>{
      this.data=res;
      if(this.data.status===1){
        this.toastr.success(JSON.stringify(this.data.message),'Success',{
          timeOut:2000,
          progressBar:true,
        });
       this.fetchUsers();
      } else{
        this.toastr.error(JSON.stringify(this.data.message),'Error',{
          timeOut:2000,
          progressBar:true,
        });
      }
    });
    this.dialogRef.close();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  openDestroy():void{
    const dialogRef = this.matDialog.open(DialogComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '789px'
    });
    
  }
}
