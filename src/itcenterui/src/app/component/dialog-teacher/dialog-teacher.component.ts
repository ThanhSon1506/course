import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { TeacherService } from 'src/app/share/+state/teacher/teacher.service';

@Component({
  selector: 'app-dialog-teacher',
  templateUrl: './dialog-teacher.component.html',
  styleUrls: ['./dialog-teacher.component.scss']
})
export class DialogTeacherComponent implements OnInit {

  data:any;
  Teacher:any;
  constructor(public dialogRef: MatDialogRef<DialogTeacherComponent>,private course:CourseService,public dialog: MatDialog,private teacher:TeacherService, private toastr:ToastrService) {}
  ngOnInit(): void {
      this.teacher.currentTeacher.subscribe(data=>(this.Teacher=data));//Always get current value!
      console.log("destroy"+this.Teacher);
  }
  destroy():void{
    this.course.destroyTeacher(this.Teacher.id).subscribe(res=>{
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
