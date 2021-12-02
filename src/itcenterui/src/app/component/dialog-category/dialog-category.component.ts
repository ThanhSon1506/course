import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/share/+state/category/category.service';
import { CourseService } from 'src/app/share/+state/course/course.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent implements OnInit {

  data:any;
  Category:any;
  constructor(private location: Location,public dialogRef: MatDialogRef<DialogCategoryComponent>,private course:CourseService,public dialog: MatDialog,private category:CategoryService, private toastr:ToastrService) {}
  ngOnInit(): void {
      this.category.currentCategory.subscribe(data=>(this.Category=data));//Always get current value!
      console.log(this.Category);
  }
  destroy():void{
    this.course.destroyCategory(this.Category.id).subscribe(res=>{
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
