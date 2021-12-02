import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/share/+state/student/student.service';
import jwt_decode from 'jwt-decode';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { ListStudentService } from 'src/app/share/+state/list_student/list-student.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
 
  from:FormGroup;
  submitted=false;
  data:any;
  hide = true;
  hide_2=true;
  flag = true;
  Student: any;
  token:any;
  type_id:any;
  userData:any;
  Course:any;
  data_2:any;
  formData=new FormData();
  

  
  constructor(private liststudent:ListStudentService,private course:CourseService,private dialogRef:MatDialogRef<CreateCourseComponent>,private matDialog: MatDialog,private formBuilder:FormBuilder,
    private student:StudentService,private toastr:ToastrService) { }
  
  ngOnInit() {
    this.course.currentMessage.subscribe(res=>{
      this.Course=res;
      console.log(this.Course.id);
      this.formData.append("course_id",this.Course.id);

    });

    this.createForm();

    this.token=localStorage.getItem('token');
        this.userData=jwt_decode(this.token);
        // this.type_id=this.userData.type_id; 
        this.f.account_id.setValue(this.userData.id);

    this.findStudent();
  
  }  
  findStudent(){
    this.student.getStudentFindAccount(this.userData.id).subscribe(res=>{
      this.Student=res;

    this.formData.append("student_id",this.Student[0].id);


      console.log(this.Student[0].id);
    })
  }
  changeAccount(e){
    console.log(e.target.value);
  }
  createForm(){
    
    this.from = this.formBuilder.group(
      {
        lastname: [
          '',
          [
            Validators.required,
          ]
        ],
        firstname: [
          '',
          [
            Validators.required,
          ]
        ],
        date: [
          '',
          [
            Validators.required,
          ]
        ],
        phone: [
          '',
          [
            Validators.required,
          ]
        ],
        address: [
          '',
          [
            Validators.required,
          ]
        ],
        account_id: [
          '',
          [ 
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
    console.log(this.from.value);

    this.student.create(this.from.value).subscribe(res=>{
      this.data=res;
      console.log(this.data);
    });


    

    this.liststudent.create(this.formData).subscribe(res=>{
      this.data_2=res;
      console.log(this.data_2);
    });
    this.dialogRef.close();

  }

  onReset(): void {
    this.submitted = false;
    this.from.reset();
  }

}
