import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from 'src/app/share/+state/theme/theme.service';
import { VideoService } from 'src/app/share/+state/video/video.service';

@Component({
  selector: 'app-dialog-theme',
  templateUrl: './dialog-theme.component.html',
  styleUrls: ['./dialog-theme.component.scss']
})
export class DialogThemeComponent implements OnInit {

 
  data:any;
  Theme:any;
  constructor(public dialogRef: MatDialogRef<DialogThemeComponent>,private video:VideoService,public dialog: MatDialog,private theme:ThemeService, private toastr:ToastrService) {}
  ngOnInit(): void {
      this.theme.currentTheme.subscribe(data=>(this.Theme=data));//Always get current value!
      console.log(this.Theme);
  }
  destroy():void{
    this.video.destroyTheme(this.Theme.id).subscribe(res=>{
      this.data=res;
      if(this.data.status===1){
        this.toastr.success(JSON.stringify(this.data.message),'Success',{
          timeOut:2000,
          progressBar:true,
        });
        window.location.reload();

      } else{
        this.toastr.error(JSON.stringify(this.data.message),'Error',{
          timeOut:2000,
          progressBar:true,
        });
      }
    });
    this.dialogRef.close();
}

close() {
  this.dialogRef.close("Thanks for using me!");
}


}
