import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { URL_COURSE, URL_IMG } from 'src/app/admin/constant/img.constant';
import { CourseService } from 'src/app/share/+state/course/course.service';
import { ThemeService } from 'src/app/share/+state/theme/theme.service';
import { URL_VIDEOS } from 'src/app/share/+state/video/video.constant';
import { VideoService } from 'src/app/share/+state/video/video.service';
import { environment } from 'src/environments/environment';
import { WatchVideoComponent } from '../watch-video/watch-video.component';

@Component({
  selector: 'app-video-course',
  templateUrl: './video-course.component.html',
  styleUrls: ['./video-course.component.scss']
})
export class VideoCourseComponent implements OnInit {
  Theme:any;
  Course:any;
  Video:any;
  arr:any[];
  url_course=URL_COURSE;
  url_img=URL_IMG; 
   url_videos=URL_VIDEOS;
  endPoint=environment.apiUrl;
  parentMessage="Video Course";
  constructor(private matDialog: MatDialog,private course:CourseService, private video:VideoService, private theme:ThemeService) { }

  ngOnInit(): void {
    this.course.currentMessage.subscribe(res=>{
      this.Course=res;
    });

    this.theme.getThemeFindCourse(this.Course.id).subscribe(res=>{
      this.Theme=res;
      for(let item in this.Theme){
        this.video.getVideoFindTheme(this.Theme[item].id).subscribe(res=>{
          this.Video=res;
          console.log(this.Video);
        })
      }
      // console.log(this.Theme);
    });
  }
  openWatch(data) {
    this.video.changeVideo(data);
    const dialogRef = this.matDialog.open(WatchVideoComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '982px'
    });

  }

}
