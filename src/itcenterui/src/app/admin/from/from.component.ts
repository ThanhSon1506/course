import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Account } from 'src/app/share/+state/account/account.model';

import { PositionService } from 'src/app/share/+state/position/position.service';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.scss']
})
export class FromComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

 

}
