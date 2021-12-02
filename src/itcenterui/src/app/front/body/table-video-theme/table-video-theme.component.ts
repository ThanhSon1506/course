import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from 'src/app/share/+state/theme/theme.service';
import { URL_VIDEOS } from 'src/app/share/+state/video/video.constant';
import { Video } from 'src/app/share/+state/video/video.model';
import { VideoService } from 'src/app/share/+state/video/video.service';
import { environment } from 'src/environments/environment';
import { DialogThemeComponent } from '../dialog-theme/dialog-theme.component';

@Component({
  selector: 'app-table-video-theme',
  templateUrl: './table-video-theme.component.html',
  styleUrls: ['./table-video-theme.component.scss']
})
export class TableVideoThemeComponent implements AfterViewInit {

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  url_videos=URL_VIDEOS;
  endPoint=environment.apiUrl;
  // ELEMENT_DATA : Student[];
   ELEMENT_DATA !: Video[];
   dataSource = new MatTableDataSource<Video>(this.ELEMENT_DATA);  

  Theme:any;
  data:any;
  displayedColumns: string[] =['id','url','title','session_id','description','action'];



  constructor(private dialogRef: MatDialogRef<TableVideoThemeComponent>,private service: VideoService,private toastr:ToastrService ,private matDialog: MatDialog,private theme:ThemeService) { }
  ngAfterViewInit(): void {


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.theme.currentTheme.subscribe(data =>
       (this.Theme= data)); //<= Always get current value!
       console.log("Theme:"+this.Theme.id);
    this.fetchVideo()
      console.log(this.dataSource);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)

  }
 
  fetchVideo() {  
    let resp=this.service.getVideoFindTheme(this.Theme.id);
    resp.subscribe(report=>this.dataSource.data=report as unknown as Video[]);
  }  
  // remove(id) {
  //   this.service.delete(id).subscribe(res => {
  //     this.fetchCourse();
  //   })
  // }
  deleteData(object):void{
    console.log("data-account:"+object.id);
    this.fetchVideo();
    this.service.delete(object.id).subscribe(res=>{
      this.data=res;
      if(this.data.status===1){
        this.toastr.success(JSON.stringify(this.data.message),'Success',{
          timeOut:2000,
          progressBar:true,
        });
        this.fetchVideo();
      } else{
        this.toastr.error(JSON.stringify(this.data.message),'Error',{
          timeOut:2000,
          progressBar:true,
        });
      }
    });
    this.dialogRef.close();
}

openDestroy():void{
  const dialogRef = this.matDialog.open(DialogThemeComponent, {
    backdropClass: 'cdk-overlay-transparent-backdrop',
    hasBackdrop: true,
    width: '789px'
  });
  
}

}
