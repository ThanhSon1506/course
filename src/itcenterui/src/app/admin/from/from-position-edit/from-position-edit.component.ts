import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/share/+state/account/account.service';
import { PositionService } from 'src/app/share/+state/position/position.service';
import { TableAccountDelComponent } from '../../table/table-account-del/table-account-del.component';

@Component({
  selector: 'app-from-position-edit',
  templateUrl: './from-position-edit.component.html',
  styleUrls: ['./from-position-edit.component.scss']
})
export class FromPositionEditComponent implements OnInit {

  from:FormGroup;
  submitted=false;
  data:any;
  flag = false;
  Position: any = [];
  checkName="^[a-zA-Z_-]{3,15}$";

  
  constructor(private account:AccountService, private matDialog: MatDialog, private formBuilder:FormBuilder,private position:PositionService,private toastr:ToastrService,public dialogRef: MatDialogRef<FromPositionEditComponent>) { }
  
  ngOnInit() {
    this.createForm();
    this.position.currentPosition.subscribe(data =>
      (this.Position= data)); //<= Always get current value!
      console.log(this.Position);
    this.setDataInForm();
  }  

  setDataInForm(){  
    this.f.name.setValue(this.Position.name);
  }  
  createForm(){
 
    this.from = this.formBuilder.group(
      {
        
        name: [
          '',
          [
            Validators.pattern(this.checkName),
            Validators.required,
          ]
        ],
      },
     
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.from.controls;
  }

  onSubmit(): void{
    this.submitted = true;
    if (this.from.invalid) {
      return;
    }

    this.position.update(this.from.value,this.Position.id).subscribe(res=>{
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
      this.from.get('name').reset();
    });
    this.dialogRef.close("Thanks for using me!");

  }
  openDialog(): void {
    const dialogRef = this.matDialog.open(TableAccountDelComponent, {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      width:"100%",
    });
  }
  deleteData():void{
    this.account.getUsersFindPosition(this.Position.id).subscribe(res=>{
      this.data=res;
      console.log(res);
      if(this.data.status===0){
        this.position.delete(this.Position.id).subscribe(res=>{
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
          this.dialogRef.close();
        });
    
        
      } else{
        this.openDialog();
        this.position.changePosition(this.Position);
      }
  
    });


  
  }
  onReset(): void {
    this.submitted = false;
    this.from.reset();
  }

}
