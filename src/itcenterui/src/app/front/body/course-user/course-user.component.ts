import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URL_COURSE, URL_IMG } from 'src/app/admin/constant/img.constant';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-user',
  templateUrl: './course-user.component.html',
  styleUrls: ['./course-user.component.scss']
})
export class CourseUserComponent implements OnInit {
  parentMessage: string = "Our Course";
  data:any;
  url_course=URL_COURSE;
  url_img=URL_IMG;
  endPoint=environment.apiUrl;
  constructor(private _router: Router,private course:CourseService) { }

  ngOnInit(): void {
    this.fetCourse();
  }
  fetCourse():void{
    this.course.indexUser().subscribe(res=>{
      this.data=res;
    })
  }
  openCourse(item){
    this._router.navigate(['course/detail',item.id]);
    this.course.changeMessage(item);
   }

}
