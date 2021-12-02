import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/share/+state/account/account.service';
import { Student } from 'src/app/share/+state/student/student.model';
import { StudentService } from 'src/app/share/+state/student/student.service';
import Validation from '../../share/validation';

@Component({
  selector: 'app-from-account-student',
  templateUrl: './from-account-student.component.html',
  styleUrls: ['./from-account-student.component.scss']
})
export class FromAccountStudentComponent implements OnInit {
  from:FormGroup;
  Account:any =[];
  data:any;
  submitted:boolean = false;
  ELEMENT_DATA !: Student[];
  // dataSource = new MatTableDataSource<Student>(this.ELEMENT_DATA);  

  constructor(private account:AccountService, private student:StudentService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.account.currentMessage.subscribe(message =>
      (this.Account= message)); //<= Always get current value!
      // document.getElementById("#name").style.visibility = "hidden";
      this.createForm();
      this.fetchStudent();
      // console.log("student"+this.data.lastname);
  }
  onSubmit(){

  }
  get f(): { [key: string]: AbstractControl } {
    return this.from.controls;
  }

  // fetchStudent() {  
  //   let resp=this.student.getStudentFindAccount(this.Account.id);
  //   resp.subscribe(report=>this.data=report as unknown as Student[]);
  // }  

  fetchStudent(){
    this.student.getStudentFindAccount(this.Account.id).subscribe(res=>{
      this.data=res;
      // console.log("student"+this.Account.id);
      console.log("student"+this.data.lastname);
      this.setValueForm();

    });
  }

  createForm(){
  
    this.from = this.formBuilder.group(
      {
        firstname: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        lastname: [
          '',[Validators.required,]
        ],
        date: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
      },
    );
  }

  setValueForm(){
    this.f.lastname.setValue(this.data.lastname);
    this.f.firstname.setValue(this.data.firstname);
    this.f.date.setValue(this.data.date);
    this.f.phone.setValue(this.data.phone);
    this.f.address.setValue(this.data.address);
    console.log(this.data);
  }

}
