import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hotels } from '../hotels.model';
import { HotelService } from '../hotels.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotels-details',
  templateUrl: './hotels-details.component.html',
  styleUrls: ['./hotels-details.component.scss']
})
export class HotelsDetailsComponent implements OnInit, OnDestroy {

  hotel?: Hotels;
  loading = true;
  sub: any;

  constructor(private hotelService: HotelService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(() => {
      this.hotelService
        .getHotelsId()
        .then((hotel: Hotels) => {
          this.hotel = hotel;
          this.loading = false; 
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

