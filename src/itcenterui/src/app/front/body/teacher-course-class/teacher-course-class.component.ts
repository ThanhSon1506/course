import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { URL_VIDEOS } from 'src/app/share/+state/video/video.constant';
import { Video } from 'src/app/share/+state/video/video.model';
import { VideoService } from 'src/app/share/+state/video/video.service';
import { environment } from 'src/environments/environment';
import { FromLessonEditComponent } from '../../from/from-lesson-edit/from-lesson-edit.component';

@Component({
  selector: 'app-teacher-course-class',
  templateUrl: './teacher-course-class.component.html',
  styleUrls: ['./teacher-course-class.component.scss']
})
export class TeacherCourseClassComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ELEMENT_DATA !: Video[];
  url_videos=URL_VIDEOS;
  endPoint=environment.apiUrl;
  
  displayedColumns: string[] =['id','url','title','session_id','description','action'];

  dataSource = new MatTableDataSource<Video>(this.ELEMENT_DATA);  
  selectedData:any;

  constructor( private matDialog: MatDialog,private video:VideoService) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.video.currentVideo.subscribe(data =>
       (this.selectedData= data)); //<= Always get current value!
    this.fetchVideo()
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
  fetchVideo(): void {
    let resp=this.video.getVideo();
    resp.subscribe(report=>this.dataSource.data=report as unknown as Video[]);
    console.log(resp);
  }
  onRowClicked(data):void{
    console.log(data);
    this.openDialog();
    this.video.changeVideo(data);
  }
  openDialog():void{
    const dialogRef = this.matDialog.open(FromLessonEditComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '982px'
    });

    this.fetchVideo();

  }

}
