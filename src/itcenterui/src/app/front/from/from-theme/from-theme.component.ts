import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { ThemeService } from 'src/app/share/+state/theme/theme.service';
import jwt_decode from 'jwt-decode';
import { TeacherService } from 'src/app/share/+state/teacher/teacher.service';

@Component({
  selector: 'app-from-theme',
  templateUrl: './from-theme.component.html',
  styleUrls: ['./from-theme.component.scss']
})
export class FromThemeComponent implements OnInit {


  from:FormGroup;
  submitted=false;
  data:any;
  flag = false;
  resetpassword;
  Theme: any = [];
  Course: any=[];
  checkName="^[a-zA-Z_-]{3,15}$";
  token:any;
  userData:any;
  account_id:any;
  Teacher:any=[];
  teacher_id:any;
  
  constructor(private teacher:TeacherService,private course:CourseService,private formBuilder:FormBuilder,private theme:ThemeService,private toastr:ToastrService) { }
  
  ngOnInit() {
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.account_id=this.userData.id;
    this.createForm();
    // this.fetchCourse();
    this.findTeacher();
    // this.fetchUsers();
  
  }  


  createForm(){
  
    this.from = this.formBuilder.group(
      {
        
        name: [
          '',
          [
            // Validators.pattern(this.checkName),
            Validators.required,
          ]
        ],
        course_id: ['', Validators.required],


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

    this.theme.create(this.from.value).subscribe(res=>{
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

  }
  findTeacher(){
    this.teacher.getTeacherFindAccount(this.account_id).subscribe(res=>{
      this.Teacher = res;
      this.teacher_id=this.Teacher[0].id;
      this.fetchCourse(this.teacher_id);
      console.log("this.Teacher[0].id"+this.teacher_id);  
    })
  }

  // fetchAccount(teacher_id) {  
  //   let resp=this.course.getTeacherTrue(teacher_id);
  //   resp.subscribe(report=>{
  //     this.Course=report;

  //   });
  // }  
  changeCourse(data):void{
    console.log(data);

  }

  fetchCourse(teacher_id) {
    return this.course.getTeacherTrue(teacher_id).subscribe((data: {}) => {
      this.Course = data;
      this.f.course_id.setValue(this.Course[0].id);
    })    
  }

  onReset(): void {
    this.submitted = false;
    this.from.reset();
  }
}
