import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { ListStudentService } from 'src/app/share/+state/list_student/list-student.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  count:any;
  count_student:any;
  constructor(private listStudent:ListStudentService,private course:CourseService) { }

  ngOnInit(): void {
    this.countCourse();
    this.countStudent();
  }
  countCourse(){
    return this.course.countCourse().subscribe((data: {}) => {
      this.count = data;
    }) 
  }

  countStudent(){
    return this.listStudent.count().subscribe((data: {}) => {
      this.count_student=data;
    })
  }

}
