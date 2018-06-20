import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
// tslint:disable-next-line:import-blacklist
import { Observable, ObjectUnsubscribedError } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
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
