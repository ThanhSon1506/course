import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LevelService } from 'src/app/share/+state/level/level.service';

@Component({
  selector: 'app-from-level',
  templateUrl: './from-level.component.html',
  styleUrls: ['./from-level.component.scss']
})
export class FromLevelComponent implements OnInit {
  from:FormGroup;
  submitted=false;
  data:any;
  flag = false;
  resetpassword;
  Level: any = [];
  checkName="^[a-zA-Z_-]{3,15}$";

  
  constructor(private formBuilder:FormBuilder,private level:LevelService,private toastr:ToastrService) { }
  
  ngOnInit() {
    this.createForm();
    // this.fetchUsers();
  
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

    this.level.create(this.from.value).subscribe(res=>{
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

  }

  onReset(): void {
    this.submitted = false;
    this.from.reset();
  }

}
