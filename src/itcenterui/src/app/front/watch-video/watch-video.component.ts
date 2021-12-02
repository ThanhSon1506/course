import { Component, OnInit } from '@angular/core';
import { URL_VIDEOS } from 'src/app/share/+state/video/video.constant';
import { VideoService } from 'src/app/share/+state/video/video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.scss']
})
export class WatchVideoComponent implements OnInit {
  url_videos=URL_VIDEOS;
  endPoint=environment.apiUrl;
  Video:any;
  constructor(private video:VideoService) { }

  ngOnInit(): void {
    this.video.currentVideo.subscribe(res=>{
      this.Video=res;
    });
  }

}
