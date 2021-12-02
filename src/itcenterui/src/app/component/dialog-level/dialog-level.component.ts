import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { LevelService } from 'src/app/share/+state/level/level.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-dialog-level',
  templateUrl: './dialog-level.component.html',
  styleUrls: ['./dialog-level.component.scss']
})
export class DialogLevelComponent implements OnInit {

  data:any;
  Level:any;
  constructor(private location: Location,public dialogRef: MatDialogRef<DialogLevelComponent>,private course:CourseService,public dialog: MatDialog,
    private level:LevelService, private toastr:ToastrService) {}
  ngOnInit(): void {
      this.level.currentLevel.subscribe(data=>(this.Level=data));//Always get current value!
      console.log(this.Level);
  }
  destroy():void{
    console.log(this.Level);
    this.course.destroyLevel(this.Level.id).subscribe(res=>{
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
  console.log(this.Level);
  this.dialogRef.close("Thanks for using me!");
}

}
