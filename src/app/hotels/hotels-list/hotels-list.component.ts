import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Question } from '../hotels.model';
import { HotelService } from '../hotels.service';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.scss']
})
export class HotelsListComponent implements OnInit {

  data: any;
  endpoint: string;

  constructor(private hotelService: HotelService, private http: HttpClient) {
    this.endpoint = environment.endPoint;
   }

  @Input() sort = '-createdAt';
  questions: Question[];
  loading = true;

  ngOnInit() {
      this.hotelService
      .getQuestions(this.sort)
      .then((questions: Question[]) => {
        this.questions = questions;
        this.loading = false;
      });

      return this.http.get(this.endpoint)
      .catch(error => Observable.throw('error'))
      .subscribe(res => this.data = res);
  }

}