import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/share/+state/category/category.service';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { LanguageService } from 'src/app/share/+state/language/language.service';
import { LevelService } from 'src/app/share/+state/level/level.service';
import jwt_decode from 'jwt-decode';
import { TeacherService } from 'src/app/share/+state/teacher/teacher.service';

@Component({
  selector: 'app-from-teacher',
  templateUrl: './from-teacher.component.html',
  styleUrls: ['./from-teacher.component.scss']
})
export class FromTeacherComponent implements OnInit {

  
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
  token:any = [];
  account_id:any;
  userData:any;
  Teacher:any=[];
  
  constructor(private teacher:TeacherService,private language:LanguageService,private category: CategoryService,private level:LevelService,private formBuilder:FormBuilder,private course:CourseService,private toastr:ToastrService) { }
  
  ngOnInit() {
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.account_id=this.userData.id;
    console.log("id Level",this.Level.id);

    this.fetchLevel();
    this.fetchLanguage();
    this.fetchCategory();
    this.createForm();

    this.findTeacher();

    this.f.language_id.setValue(1);
    this.f.category_id.setValue(1);
    this.f.level_id.setValue(1);
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
 findTeacher(){
    this.teacher.getTeacherFindAccount(this.account_id).subscribe(res=>{
      this.Teacher = res;
     this.f.teacher_id.setValue(this.Teacher[0].id);
     console.log("adasd"+ this.Teacher[0].id);

      console.log(this.Teacher);  
    })
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
    
        price: [
          '',
          [
            Validators.pattern("^[+-]?((\\d+(\.\\d*)?)|(\.\\d+))$"),
            Validators.required,
          ]
        ],
        photo: [
          '',[
            Validators.required,
            RxwebValidators.image({maxHeight:100,maxWidth:100 }),
            RxwebValidators.extension({extensions:["jpeg","gif","png"]})
           ]
        ],
        level_id: ['', Validators.required],
        category_id: ['', Validators.required],
        language_id: ['', Validators.required],
        teacher_id:['',Validators.required],
      },
    
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.from.controls;
  }

  onSubmit(): void{
    this.submitted = true;
    console.log(this.from.value);
    const formData=new FormData();
    // if(!this.imageSrc==null){
    //   formData.append("photo",this.from.get('photo').value);
    // }
    formData.append("photo",this.File,this.File.name);
    formData.append("name",this.from.get('name').value);
    formData.append("price",this.from.get('price').value);
    formData.append("language_id",this.from.get('language_id').value);
    formData.append("category_id",this.from.get('category_id').value);
    formData.append("level_id",this.from.get('level_id').value);
    formData.append("teacher_id",this.from.get('teacher_id').value);
    if (this.from.invalid) {
      return;
    }

    this.course.create(formData).subscribe(res=>{
      this.data=res;
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
      this.from.get('price').reset();
      // this.from.get('photo').reset();
      this.imageSrc=null;
      console.log("debug"+this.imageSrc);
      this.f.language_id.setValue(1);
      this.f.category_id.setValue(1);
      this.f.level_id.setValue(1);
    
    });

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
}
