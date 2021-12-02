import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AccountsComponent } from 'src/app/admin/body/accounts/accounts.component';
import { QuestionService } from 'src/app/share/+state/question/question.service';
@Component({
  selector: 'app-from-question',
  templateUrl: './from-question.component.html',
  styleUrls: ['./from-question.component.scss'] 
})
export class FromQuestionComponent implements OnInit {
  questions:any=[];
  examId:number ;
  question_count:number=0;
  show:boolean=true;
  buttonTitle:string='Next';
  stopTimer:any;
  time:0;
  dt =new Date(new Date().setTime(0));
  ctime=this.dt.getTime();
  seconds=Math.floor((this.ctime%(1000*60))/1000);
  minutes=Math.floor((this.ctime%(1000*60*60))/(1000*60));
  formated_sec:any="00";
  formated_min:any="00";
  userAnswer='';
  correctAnswer:number=0;
  btnDissabled:boolean=true;
  constructor(private _router:ActivatedRoute, private question:QuestionService) { }

  ngOnInit(): void {
    this.formated_sec="00";
    this.formated_min="00";
    this.time=0;
    this.questions=[];
    this.examId=this._router.snapshot.params['id'];
    console.log("examId"+this.examId);
    this.timer();
    this.question.readQuestion(this.examId).subscribe(res=>{
      this.questions=res;
      console.log(this.questions);
    })
  }
  timer(){
    this.stopTimer=setInterval(()=>{
      this.time++;
      if(this.seconds<59){
        this.seconds++;
      }else{
        this.seconds=0;
        this.minutes++;
      }
      this.formated_sec=this.seconds<10?`0${this.seconds}`:`${this.seconds}`;
      this.formated_min=this.minutes<10?`0${this.minutes}`:`${this.minutes}`;
    },1000)
  }
  next():void{
    this.btnDissabled=true;
      let options=document.querySelectorAll("div.option");
      for(let i=0; i<options.length;i++){
        options[i].classList.remove("already-answered"); 
        options[i].classList.remove("wrong");
        options[i].classList.remove("correct");

      }
    if(this.question_count== this.questions.length-1){
        this.show=false;
    }

    if(this.question_count== this.questions.length-2){
      this.buttonTitle="Finish";
      clearInterval(this.stopTimer);
    }
    this.question_count++;
    

  }
  toggleClass(item):void{
     
    this.btnDissabled=false;
    if(item==0){
      this.userAnswer="A";  
    }else if(item==1){
      this.userAnswer="B";
    }else if(item==2){
      this.userAnswer="C";
    }else if(item==3){
      this.userAnswer="D";
    }else{}
    //If User Selected Option correct
    let options=document.querySelectorAll("div.option");
    console.log("Selected Answer =" +this.userAnswer);
    if(this.userAnswer==this.questions[this.question_count].answer_correct){
      this.correctAnswer++;
      let options=document.querySelectorAll("div.option");
      let indicator=document.querySelectorAll(".answers-indicator div");
      for(let i=0; i<options.length;i++){
        options[i].classList.add("already-answered"); 
      }
      options[item].classList.add("correct");
      indicator[this.question_count].classList.add("correct");
    }
    //If User Selected Option wrong
    else{
      let options=document.querySelectorAll("div.option");
      let indicator=document.querySelectorAll(".answers-indicator div");

      for(let i=0; i<options.length;i++){
        options[i].classList.add("already-answered"); 
      }
      options[item].classList.add("wrong");

      indicator[this.question_count].classList.add("wrong");

    }

    //Show Correct Answer To userAnswer
    // if(this.userAnswer){
    //    //If Opition A is Correct
    // if(this.questions[this.question_count].answer_correct=='A'){
    //   setTimeout(() =>{
    //     options[0].classList.add("correct");
    //   },2000);
    // }

    //  //If Opition B is Correct
    //  if(this.questions[this.question_count].answer_correct=='B'){
    //   setTimeout(() =>{
    //     options[0].classList.add("correct");
    //   },2000);
    // }

    //  //If Opition C is Correct
    //  if(this.questions[this.question_count].answer_correct=='C'){
    //   setTimeout(() =>{
    //     options[0].classList.add("correct");
    //   },2000);
    // }

    //  //If Opition D is Correct
    //  if(this.questions[this.question_count].answer_correct=='D'){
    //   setTimeout(() =>{
    //     options[0].classList.add("correct");
    //   },2000);
    // }
    // }
   

  }

}
