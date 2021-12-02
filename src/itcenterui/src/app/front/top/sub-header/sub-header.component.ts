import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../share/data.service';
@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {
  constructor(){}
  @Input() childMessage: string;
  ngOnInit(){
  

  }

  title = 'Itcenterui';
}
