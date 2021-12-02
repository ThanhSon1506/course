import { Component, OnInit } from '@angular/core';
import { CrudService } from "../../../share/crud.service";

@Component({
  selector: 'app-table-person',
  templateUrl: './table-person.component.html',
  styleUrls: ['./table-person.component.scss']
})
export class TablePersonComponent implements OnInit {
  Users: any = [];

  constructor(public crudService: CrudService) { }

  ngOnInit() {
    this.fetchUsers()
  }  
  fetchUsers() {
    return this.crudService.getUsers().subscribe((data: {}) => {
      this.Users = data;
    })    
  }  
  remove(id) {
    this.crudService.delete(id).subscribe(res => {
      this.fetchUsers()
    })
  }
}
