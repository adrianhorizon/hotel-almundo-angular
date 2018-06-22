import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  infoData: any;

  constructor(private hotelService: HotelService, private http: HttpClient) {
    this.dataHotel = environment.DataHotel;
   }

  @Input() sort = '-createdAt';
  hotels: Hotels[];
  loading = true;

  ngOnInit() {
      this.hotelService
      .getHotels(this.sort)
      .then((hotels: Hotels[]) => {
        this.hotels = hotels;
        this.loading = false;
      });

      return this.http.get(this.dataHotel)
      .catch(error => Observable.throw('error'))
      .subscribe(res => {
        this.data = res as Hotels[];
        console.log(res);
          console.log(res.length);
      });
  }

}