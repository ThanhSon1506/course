import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { ExamService } from 'src/app/share/+state/exam/exam.service';
import { QuestionService } from 'src/app/share/+state/question/question.service';
import { ThemeService } from 'src/app/share/+state/theme/theme.service';
import { Exam } from 'src/app/share/+state/exam/exam.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-question',
  templateUrl: './user-question.component.html',
  styleUrls: ['./user-question.component.scss']
})
export class UserQuestionComponent implements OnInit {

  constructor(private question:QuestionService,private exam:ExamService,
    private course:CourseService, private theme:ThemeService,private _router:Router) { }
  
  
  Course:any;
  themeCourse:any=[];
  examList:any=[];
  showCard:boolean=false;
  showLoadingIndicator:boolean=false;
  examPaper:any=[];
  ngOnInit(): void {
    this.course.currentMessage.subscribe(res=>{
      this.Course=res;
      // console.log("sdfsd"+this.Course);
      this.theme.getThemeFindCourse(this.Course.id).subscribe(res=>{
        this.themeCourse=res;
        // console.log(this.themeCourse);
      })
    })
    // console.log(this.)
  }
  loadExam(id){
    this.showCard=false;
    const examid=id.target.value;
    this.examList=[];
    this.showLoadingIndicator=true;
    this.exam.findQuestionByExam(examid).subscribe(res=>{
      this.examList=res;
      this.showLoadingIndicator=false;
      // console.log(this.examList);
    })
  }

  loadPaper(id){
    let examPaperId=id.target.value;
    this.showLoadingIndicator=true;
    this.exam.readExam(examPaperId).subscribe(res=>{
      // console.log(res);
      this.examPaper=res;
      // console.log(this.examPaper);
      this.showCard=true;
      this.showLoadingIndicator=false;
    })
  }

  goToQuestion(id){
    console.log(id);
    this._router.navigate(['/question',id]);
  }

}
