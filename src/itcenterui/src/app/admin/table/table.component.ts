import { Component, OnInit } from '@angular/core';
import { CrudService } from "../.././share/crud.service";
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent  implements OnInit{
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
