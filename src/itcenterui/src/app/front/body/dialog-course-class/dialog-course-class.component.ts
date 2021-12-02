import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/share/+state/project/project.service';
import { DialogCheckedComponent } from '../dialog-checked/dialog-checked.component';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dialog-course-class',
  templateUrl: './dialog-course-class.component.html',
  styleUrls: ['./dialog-course-class.component.scss']
})
export class DialogCourseClassComponent implements OnInit {
  Project:any=[];
  from:FormGroup;
  submitted=false;
  data:any=[];
  token:any;
  userData:any;
  account_id:any;
  constructor(public dialogRef: MatDialogRef<DialogCourseClassComponent>,private toastr:ToastrService,private formBuilder:FormBuilder,private matDialog: MatDialog,private project:ProjectService) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.account_id=this.userData.id;
    this.createForm();
    this.fetchProject();
  }
  fetchProject() {
    return this.project.getProject().subscribe((data: {}) => {
      this.Project = data;
    })    
  }

  createForm(){
  
    this.from = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.pattern("^[+#0-9a-zA-Z_-\\s{0,1}]{3,100}$"),
          ]
        ],
        video_id:['', Validators.required],
        teacher_id:['', Validators.required],
        course_id: ['', Validators.required],
        end_date: ['', Validators.required],
        start_date: ['', Validators.required],
      },
    
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.from.controls;
  }
  openDialog():void{

    const dialogRef = this.matDialog.open(DialogCheckedComponent,   {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width: '982px'
    });
  }
  onSubmit(): void{
    
    this.submitted = true;
    if (this.from.invalid) {
      return;
    }

    this.project.create(this.from.value).subscribe(res=>{
      this.data=res;
      console.log(res);
      if(this.data.status===1){
        this.toastr.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true,
        });
      } else{
        this.toastr.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),{
          timeOut:2000,
          progressBar:true,
        });
      }
      this.submitted=false;
    });
    this.dialogRef.close();


  }
}
