import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  constructor() { }
  parentMessage: string = "Our Certficate & Online Programs for 2021";
  ngOnInit(): void {
    
  }

}
