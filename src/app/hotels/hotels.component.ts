import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  data: Array<any>;
  api: string;
  dataHotel: string;

  constructor() {
   }

  ngOnInit() {
  }
}
