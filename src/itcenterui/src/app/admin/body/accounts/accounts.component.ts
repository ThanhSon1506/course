import { Component, OnInit } from '@angular/core';
import { PositionService } from 'src/app/share/+state/position/position.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  Position: any = [];
  constructor(private service: PositionService) { }
  ngOnInit() {
    this.fetchUsers()
  } 
  fetchUsers() {
    return this.service.getPosition().subscribe((data: {}) => {
      this.Position = data;
    })    
  }   
}
