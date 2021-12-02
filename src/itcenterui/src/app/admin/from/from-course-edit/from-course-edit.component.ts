import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/share/+state/category/category.service';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { LanguageService } from 'src/app/share/+state/language/language.service';
import { LevelService } from 'src/app/share/+state/level/level.service';
import { ThemeService } from 'src/app/share/+state/theme/theme.service';
import { TableThemeCourseComponent } from '../../table/table-theme-course/table-theme-course.component';

@Component({
  selector: 'app-from-course-edit',
  templateUrl: './from-course-edit.component.html',
  styleUrls: ['./from-course-edit.component.scss']
})
export class FromCourseEditComponent implements OnInit {

  
  from:FormGroup;
  submitted=false;
  image=false;
  data:any;
  imageSrc: string;
  hide = true;
  hide_2=true;
  flag = false;
  // email = new FormControl('', [Validators.required, Validators.email]);
  resetpassword;
  Level: any = [];
  Language:any=[];
  Category:any=[];
  Course:any =[];
  File:any=[];
  
  constructor(private matDialog: MatDialog,private theme:ThemeService,public dialogRef: MatDialogRef<FromCourseEditComponent>,private language:LanguageService,private category: CategoryService,private level:LevelService,private formBuilder:FormBuilder,private course:CourseService,private toastr:ToastrService) { }
  
  ngOnInit() {
    console.log("id Level",this.Level.id);
    this.fetchLevel();
    this.fetchLanguage();
    this.fetchCategory();
    this.createForm();
    if(this.imageSrc){
      document.getElementById("storage").style.display = "none";
    }
    this.course.currentMessage.subscribe(message =>
      (this.Course= message)); //<= Always get current value!
    // this.checkImage();
    this.setValueForm();
  }  
  sendLevel(e){
    console.log(e);
  }
  
  changeLevel(e){
    console.log(e.target.value);
  }
  sendCategory(e){
    console.log(e);
  }
 
  changeCategory(e){
    console.log(e.target.value);
  }
  sendLanguage(e){
    console.log(e);
  }
 
  changeLanguage(e){
    console.log(e.target.value);
  }
  setValueForm(){
    this.f.name.setValue(this.Course.name);
    // this.f.lesson.setValue(this.Course.lesson);
    // this.f.file.setValue(this.Course.photo);
    this.f.price.setValue(this.Course.price);
    this.f.language_id.setValue(this.Course.language_id);
    this.f.category_id.setValue(this.Course.category_id);
    this.f.level_id.setValue(this.Course.level_id);
    this.f.photo.setValue(this.Course.photo);
    // this.imageSrc="http://127.0.0.1:8000/storage/courses/"+this.Course.photo;
    // console.log(this.imageSrc);
  }
  createForm(){
  
    this.from = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.pattern("^[+#0-9a-zA-Z_-\\s{0,1}]{3,100}$"),
          ]
        ],
        // lesson: [
        //   '',
        //   [
        //     Validators.pattern("^\\d+$"),
        //     Validators.required,
        //   ]
        // ],
        price: [
          '',
          [
            Validators.pattern("^[+-]?((\\d+(\.\\d*)?)|(\.\\d+))$"),
            Validators.required,
          ]
        ],
        photo: [
          '',[
           ]
        ],
        level_id: ['', Validators.required],
        category_id: ['', Validators.required],
        language_id: ['', Validators.required],
      },
    
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.from.controls;
  }

  onSubmit(): void{
    this.submitted = true;
    const formData=new FormData();
    if (this.from.invalid) {
      return;
    }
   
    // console.log(this.from.value);
    if(this.imageSrc==null){
      console.log(this.from.value);

      this.course.update(this.from.value,this.Course.id).subscribe(res=>{
        this.data=res;
        if(this.data.status===1){
          this.toastr.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
            timeOut:2000,
            progressBar:true,
          });
    window.location.reload();

        } else{
          this.toastr.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
            timeOut:2000,
            progressBar:true,
          });
        }
      
      
      });
      this.dialogRef.close();
    }
    else{
    formData.append("photo",this.File,this.File.name);
    formData.append("name",this.from.get('name').value);
    // formData.append("lesson",this.from.get('lesson').value);
    formData.append("price",this.from.get('price').value);
    formData.append("language_id",this.from.get('language_id').value);
    formData.append("category_id",this.from.get('category_id').value);
    formData.append("level_id",this.from.get('level_id').value);
    console.log("fromData"+formData);
   
    this.course.updateImg(formData,this.Course.id).subscribe(res=>{
      this.data=res;
      if(this.data.status===1){
        this.toastr.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true,
        });
    window.location.reload();

      } else{
        this.toastr.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true,
        });
      }
    
    
    });
    this.dialogRef.close();
    }
    

  }


  onFileChange(event) {
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      this.File=file;
        this.image=true;
        reader.onload = () => {
          
          this.imageSrc = reader.result as string;
        
          this.from.patchValue({
            fileSource: reader.result
          });
      
        };
      
    }
    this.File=event.target.files[0];
    console.log(this.File)
  }
    
  onReset(): void {
    this.submitted = false;
    this.from.reset();
  }

  fetchLevel() {
      return this.level.getLevel().subscribe((data: {}) => {
        this.Level = data;
      })    
    }
  fetchLanguage() {
      return this.language.getLanguage().subscribe((data: {}) => {
        this.Language = data;
      })    
    }
  fetchCategory() {
      return this.category.getCategory().subscribe((data: {}) => {
        this.Category = data;
      })    
    }

  returnFileSize(number) {
      if(number < 1024) {
        return number + 'bytes';
      } else if(number >= 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + 'KB';
      } else if(number >= 1048576) {
        return (number/1048576).toFixed(1) + 'MB';
      }
    }
  // delete(){
  //   this.course.delete(this.Course.id).subscribe(res=>{
  //     this.data=res;
  //     if(this.data.status===1){
  //       this.toastr.success(JSON.stringify(this.data.message),'Success',{
  //         timeOut:2000,
  //         progressBar:true,
  //       });
  //     } else{
  //       this.toastr.error(JSON.stringify(this.data.message),'Error',{
  //         timeOut:2000,
  //         progressBar:true,
  //       });
  //     }
  //   });
  //   this.dialogRef.close("Thanks for using me!");
  // }

  deleteData():void{
    this.theme.getThemeFindCourse(this.Course.id).subscribe(res=>{
      this.data=res;
      console.log(res);
      if(this.data.status===0){
        this.course.delete(this.Course.id).subscribe(res=>{
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
        this.course.changeMessage(this.Course);
      }
  
    });


  
  }


  openDialog(): void {
    const dialogRef = this.matDialog.open(TableThemeCourseComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width:"100%",
    });
  }
 
}
