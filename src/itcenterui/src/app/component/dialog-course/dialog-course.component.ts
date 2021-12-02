import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { ThemeService } from 'src/app/share/+state/theme/theme.service';

@Component({
  selector: 'app-dialog-course',
  templateUrl: './dialog-course.component.html',
  styleUrls: ['./dialog-course.component.scss']
})
export class DialogCourseComponent implements OnInit {

  data:any;
  Course:any;
  constructor(public dialogRef: MatDialogRef<DialogCourseComponent>,
    private theme:ThemeService,public dialog: MatDialog,
    private course:CourseService, private toastr:ToastrService) {}
  ngOnInit(): void {
      this.course.currentMessage.subscribe(data=>(this.Course=data));//Always get current value!
      console.log(this.Course);
  }
  destroy():void{
    this.theme.destroyCourse(this.Course.id).subscribe(res=>{
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
