import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PositionService } from 'src/app/share/+state/position/position.service';
import Validation from '../../share/validation';

@Component({
  selector: 'app-from-position',
  templateUrl: './from-position.component.html',
  styleUrls: ['./from-position.component.scss']
})
export class FromPositionComponent implements OnInit {

  
  from:FormGroup;
  submitted=false;
  data:any;
  checkName="^[a-zA-Z_-]{3,15}$";
  hide = true;
  hide_2=true;
  flag = false;
  // email = new FormControl('', [Validators.required, Validators.email]);
  resetpassword;
  Position: any = [];
  // new_account =new Account('1','son','s','d','s','d');
  // Account:any =[];
  
  constructor(private formBuilder:FormBuilder,private position:PositionService,private toastr:ToastrService) { }
  
  ngOnInit() {
    this.createForm();
    // this.fetchUsers();
  
  }  


  createForm(){
    // this.form=this.formBuilder.group([{
    //   username:[null,Validators.required],
    //   email:['',[Validators.required,Validators.email]],
    //   password:['',[Validators.required,Validators.minLength(6)]],
    //   confirmPassword:['',Validators.required]
    // }]);
    
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

//   get name() {
//     return this.from.get('name');
// } 

  onSubmit(): void{
    this.submitted = true;
    if (this.from.invalid) {
      return;
    }

    this.position.create(this.from.value).subscribe(res=>{
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
