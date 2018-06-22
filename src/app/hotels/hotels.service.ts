import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Hotels } from './hotels.model';

@Injectable()
export class HotelService {

  data: any;
  private hotelsUrl: string;

  constructor(private http: HttpClient) {
    this.hotelsUrl = environment.DataHotel + 'hotels'
  }

  getHotels(sort = '-createdAt'): Promise<void | Hotels[]> {
    return this.http.get(`${this.hotelsUrl}?sort=${sort}`)
              .toPromise()
              .then(response => response as Hotels[])
              .catch(this.handleError);
  }

  getQuestion(id): Promise<void | Hotels> {
    const url = this.hotelsUrl + id;
    return this.http.get(url)
            .toPromise()
            .then(response => response as Hotels)
            .catch(this.handleError);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }

  addQuestion(question: Hotels) {
    const body = JSON.stringify(question);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.getToken();

    return this.http.post(this.hotelsUrl + token, body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  handleError(error: any) {
    const errMsg = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg);
  }
}
