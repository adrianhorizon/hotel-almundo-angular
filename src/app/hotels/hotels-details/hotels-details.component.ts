import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Hotels } from '../hotels.model';
import { HotelService } from '../hotels.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hotels-details',
  templateUrl: './hotels-details.component.html',
  styleUrls: ['./hotels-details.component.scss']
})
export class HotelsDetailsComponent implements OnInit {

  hotel?: Hotels;
  loading = true;
  sub: any;
  data: any;
  endpoint: string;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.endpoint = environment.endPoint;
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.hotelService
        .getQuestion(params.id)
        .then((hotel: Hotels) => {
          this.hotel = hotel;
          this.loading = false;
        });
    });

    return this.http.get(this.endpoint)
      .catch(error => Observable.throw('error'))
      .subscribe(res => this.data = res);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

