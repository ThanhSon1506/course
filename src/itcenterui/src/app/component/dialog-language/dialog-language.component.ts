import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TableCourseDelComponent } from 'src/app/admin/table/table-course-del/table-course-del.component';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { LanguageService } from 'src/app/share/+state/language/language.service';
import {Location} from '@angular/common';
  
@Component({
  selector: 'app-dialog-language',
  templateUrl: './dialog-language.component.html',
  styleUrls: ['./dialog-language.component.scss']
})
export class DialogLanguageComponent implements OnInit {
  data:any;
  Language:any;
  constructor(private location: Location,public dialogRef: MatDialogRef<DialogLanguageComponent>,private course:CourseService,public dialog: MatDialog,private language:LanguageService, private toastr:ToastrService) {}
  ngOnInit(): void {
      this.language.currentLanguage.subscribe(data=>(this.Language=data));//Always get current value!
      console.log(this.Language);
  }
  destroy():void{
    this.course.destroyLanguage(this.Language.id).subscribe(res=>{
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
