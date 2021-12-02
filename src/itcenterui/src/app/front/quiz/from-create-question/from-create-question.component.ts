import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from 'src/app/share/+state/exam/exam.service';
import { QuestionService } from 'src/app/share/+state/question/question.service';

@Component({
  selector: 'app-from-create-question',
  templateUrl: './from-create-question.component.html',
  styleUrls: ['./from-create-question.component.scss']
})
export class FromCreateQuestionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FromCreateQuestionComponent>,private question:QuestionService, private formBuilder:FormBuilder,private exam:ExamService, private toastr:ToastrService) { }
  from:FormGroup;
  submitted=false;
  Answers :any=['A','B','C','D'];
  data:any;
  Exam:any;
  Exam_2:any=[];
  sum:number=0;
  // btnDone:boolean=false;
  ngOnInit(): void {
    this.exam.currentExam.subscribe(res=>{
      this.Exam=res;
      this.exam.findExam(this.Exam).subscribe(res=>{
        this.Exam_2=res;
      console.log(this.Exam);
      console.log(this.Exam_2[0].id);
     this.f.exam_id.setValue(this.Exam_2[0].id);

      })

    })
    this.createForm();
    this.f.answer_correct.setValue('A');

  }
 

  openDialog():void{

  }
  get f(): { [key: string]: AbstractControl } {
    return this.from.controls;
    
  }
  
  createForm(){
    
    this.from = this.formBuilder.group(
      {
      
       
        exam_id: [
          '',
          [
            Validators.required,
          ]
        ],
        question: [
          '',
          [ 
            Validators.required,
          ]
        ],
        answer_A: [
          '',
          [ 
            Validators.required,
          ]
        ],
        answer_B: [
          '',
          [ 
            Validators.required,
          ]
        ],
        answer_C: [
          '',
          [ 
            Validators.required,
          ]
        ],
        answer_D: [
          '',
          [ 
            Validators.required,
          ]
        ],
        answer_correct: [
          '',
          [ 
            Validators.required,
          ]
        ],

      },
     
    );
  }

  onSubmit(): void{
    this.submitted = true;
    this.sum++;

    if (this.from.invalid) {
      return;
    }  
    console.log(this.from.value);
    this.question.create(this.from.value).subscribe(res=>{
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
    this.submitted=false;
    this.f.question.reset();
    this.f.answer_A.reset();
    this.f.answer_B.reset();
    this.f.answer_C.reset();
    this.f.answer_D.reset();
    this.f.answer_correct.setValue('A');
    this.f.answer_correct.reset();
    if(this.Exam.question_sum-this.sum==0){
      this.dialogRef.close();
    }

    }
    changeAnswer(data):void{
      console.log(data);
    }

}
