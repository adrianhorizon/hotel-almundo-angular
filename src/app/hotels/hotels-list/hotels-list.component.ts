import { Component, OnInit, Input } from '@angular/core';
import { Hotels } from '../hotels.model';
import { HotelService } from '../hotels.service';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.scss']
})
export class HotelsListComponent implements OnInit {

  data: any;
  dataHotel: string;

  constructor(private hotelService: HotelService) {
   }

  @Input() sort = '-id';
  hotels: Hotels[];
  loading = true;

  ngOnInit() {
      this.hotelService
      .getHotels(this.sort)
      .then((hotels: Hotels[]) => {
        this.hotels = hotels;
        this.loading = false;
      });
  }
}