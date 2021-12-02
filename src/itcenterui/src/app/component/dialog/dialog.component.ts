import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/share/+state/account/account.service';
import { PositionService } from 'src/app/share/+state/position/position.service';
import {Location} from '@angular/common';
import { TableAccountDelComponent } from 'src/app/admin/table/table-account-del/table-account-del.component';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})


export class DialogComponent implements OnInit {
  data:any;
  Position:any;
  constructor(private location: Location,public dialogRef: MatDialogRef<DialogComponent>,public dialogPos: MatDialogRef<TableAccountDelComponent>,private account:AccountService,public dialog: MatDialog,private position:PositionService, private toastr:ToastrService) {}
  ngOnInit(): void {
      this.position.currentPosition.subscribe(data=>(this.Position=data));//Always get current value!
      console.log(this.Position);
  }
  destroy():void{
    this.account.destroy(this.Position.id).subscribe(res=>{
      this.data=res;
      if(this.data.status===1){
        this.toastr.success(JSON.stringify(this.data.message),'Success',{
          timeOut:2000,
          progressBar:true,
        });
        window.location.reload();
      } else{
        this.toastr.error(JSON.stringify(this.data.message),'Error',{
          timeOut:2000,
          progressBar:true,
        });
      }
    });
    this.dialogRef.close();
}

close() {
  this.dialogRef.close("Thanks for using me!");
}
}
