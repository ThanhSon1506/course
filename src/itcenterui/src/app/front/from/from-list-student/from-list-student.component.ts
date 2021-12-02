import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { ListStudentService } from 'src/app/share/+state/list_student/list-student.service';
import { StudentService } from 'src/app/share/+state/student/student.service';

@Component({
  selector: 'app-from-list-student',
  templateUrl: './from-list-student.component.html',
  styleUrls: ['./from-list-student.component.scss']
})
export class FromListStudentComponent implements OnInit {

  Course:any;
  Student:any;
  constructor(private listStudent:ListStudentService,private student:StudentService, private course:CourseService) { }

  ngOnInit(): void {
    this.course.currentMessage.subscribe(message =>{
      this.Course=message;
      this.listStudent.find(this.Course.id).subscribe(student =>{
        this.Student=student;
      })
    })
  }

}
