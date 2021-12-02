import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from 'src/app/share/+state/exam/exam.service';
import { ThemeService } from 'src/app/share/+state/theme/theme.service';
import jwt_decode from 'jwt-decode';
import { TeacherService } from 'src/app/share/+state/teacher/teacher.service';
import { FromQuestionComponent } from '../../question/from-question/from-question.component';
import { FromCreateQuestionComponent } from '../from-create-question/from-create-question.component';

@Component({
  selector: 'app-from-quiz',
  templateUrl: './from-quiz.component.html',
  styleUrls: ['./from-quiz.component.scss']
})
export class FromQuizComponent implements OnInit {

  from:FormGroup;
  submitted=false;
  data:any;
  file=false;
  fileSrc: string;
  progress = 0;
  File:any=[];
  Session:any;
  token:any;
  userData:any;
  account_id:any;
  teacher_id:any;
  Teacher:any;
  Exam:any=[];

  constructor(private teacher:TeacherService,private theme:ThemeService,private exam:ExamService, private toastr:ToastrService,
    private matDialog: MatDialog,private formBuilder:FormBuilder, 
    ) { }
  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.account_id=this.userData.id;
    this.createForm();
    this.fetchSession();
    this.findTeacher();
  }
  createForm(){
    
    this.from = this.formBuilder.group(
      {
      
        name: [
          '',
          [
            Validators.required,
          ]
        ],
        teacher_id: [
          '',
          [
            Validators.required,
          ]
        ],
        session_id: [
          '',
          [ 
            Validators.required,
          ]
        ],
        question_sum: [
          '',
          [ 
            Validators.required,
          ]
        ],
        request_percent: [
          '',
          [ 
            Validators.required,
          ]
        ],
        deadline: [
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


  fetchSession():void{
    this.theme.getTheme().subscribe(res=>{
      this.Session=res;
      this.f.session_id.setValue(1);
      console.log(this.Session);
    })
  }
  findTeacher(){
    this.teacher.getTeacherFindAccount(this.account_id).subscribe(res=>{
      this.Teacher=res;
      this.f.teacher_id.setValue(this.Teacher[0].id);

    })
  }
  openDialog(): void {
    const dialogRef = this.matDialog.open(FromCreateQuestionComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: false,
      width: '789px'
    });

  }

  onSubmit(): void{
    this.submitted = true;

    console.log(this.from.value);

    if (this.from.invalid) {
      return;
    }
    this.exam.create(this.from.value).subscribe(res=>{
      this.data=res;
      console.log("this.from.value"+this.from.value);
      console.log(res);
      if(this.data.status===1){
        this.toastr.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true,
        }); 
        this.openDialog();
    
      } else{
        this.toastr.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true,
        });
      }
      
    });
    this.exam.changeExam(this.from.value);
    // console.log("asdsadasdad"+this.from.value);
    this.submitted=false;
    this.f.name.reset();
    this.f.question_sum.reset();
    this.f.request_percent.reset();
    this.f.deadline.reset();
    this.f.session_id.setValue(1);

    }
    changeLevel(data):void{
      console.log(data);
    }
    // fetchSession() {
    //   return this.theme.getTheme().subscribe((data: {}) => {
    //     this.Session = data;
    //     this.f.session_id.setValue(1);
    //   })    
    // }
    // onReset(): void {
    //   this.submitted = false;
    //   this.from.reset();
    // }

    changeSession(data):void{
      console.log(data);
    }

}
