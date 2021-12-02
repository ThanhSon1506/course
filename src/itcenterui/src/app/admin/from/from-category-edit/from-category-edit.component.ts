import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/share/+state/category/category.service';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { TableCourseCategoryComponent } from '../../table/table-course-category/table-course-category.component';

@Component({
  selector: 'app-from-category-edit',
  templateUrl: './from-category-edit.component.html',
  styleUrls: ['./from-category-edit.component.scss']
})
export class FromCategoryEditComponent implements OnInit {

  from:FormGroup;
  submitted=false;
  data:any;
  flag = false;
  Category: any = [];
  checkName="^[a-zA-Z_-]{3,15}$";

  
  constructor(private course:CourseService, private matDialog: MatDialog,
     private formBuilder:FormBuilder,private category:CategoryService,private toastr:ToastrService,public dialogRef: MatDialogRef<FromCategoryEditComponent>) { }
  
  ngOnInit() {
    this.createForm();
    this.category.currentCategory.subscribe(data =>
      (this.Category= data)); //<= Always get current value!
      console.log(this.Category);
    this.setDataInForm();
  }  

  setDataInForm(){  
    this.f.name.setValue(this.Category.name);
  }  
  createForm(){
 
    this.from = this.formBuilder.group(
      {
        
        name: [
          '',
          [
            Validators.pattern(this.checkName),
            Validators.required,
          ]
        ],


      },
     
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.from.controls;
  }

  onSubmit(): void{
    this.submitted = true;
    if (this.from.invalid) {
      return;
    }

    this.category.update(this.from.value,this.Category.id).subscribe(res=>{
      this.data=res;
      console.log(res);
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
      this.submitted=false;
      this.from.get('name').reset();
    });
    this.dialogRef.close("Thanks for using me!");

  }
  openDialog(): void {
    const dialogRef = this.matDialog.open(TableCourseCategoryComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width:"100%",
    });
  }
  deleteData():void{
    this.course.getCourseFindCategory(this.Category.id).subscribe(res=>{
      this.data=res;
      console.log(res);
      if(this.data.status===0){
        this.category.delete(this.Category.id).subscribe(res=>{
          this.data=res;
          console.log(res);
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
          this.dialogRef.close();
        });
    
        
      } else{
        this.openDialog();
        this.category.changeCategory(this.Category);
      }
  
    });


  
  }
  onReset(): void {
    this.submitted = false;
    this.from.reset();
  }


}
