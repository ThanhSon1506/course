import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../share/data.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit{
  parentMessage: string = "About Us";
constructor(){}
  ngOnInit() {
    
    }
  
}
