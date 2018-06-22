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
  endpoint: string;
  data: Array<any>;
  api: string;

  constructor(private http: HttpClient) {
    this.endpoint = environment.endPoint;
   }

  ngOnInit() {
     this.http.get(this.endpoint)
    .map(Response => Response)
    .catch(error => Observable.throw('error'))
    .subscribe(res => this.data = res);
  }
}
