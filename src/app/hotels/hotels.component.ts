import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  data: Array<any>;
  api: string;
  dataHotel: string;

  constructor(private http: HttpClient) {
    this.dataHotel = environment.DataHotel;
   }

  ngOnInit() {
  /*   this.http.get(this.dataHotel)
    .map(Response => Response)
    .catch(error => Observable.throw('error'))
    .subscribe(res => {
      this.data = res
      console.log(res);
    }); */
  }
}
