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
  hotelsUrl: string;
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.hotelsUrl = environment.DataHotel;
  }
  // Method GET/Hotles api json 
  getHotel() {
    return this.http.get(this.hotelsUrl)
    .toPromise()
    .then(response => response as Hotels[])
    .catch(this.handleError);
  }
  // Method GET/Hotels api Json sort id
  getHotels(sort = '-id'): Promise<void | Hotels[]> {
    return this.http.get(`${this.hotelsUrl}?sort=${sort}`)
              .toPromise()
              .then(response => response as Hotels[])
              .catch(this.handleError);
  }
  // Method GET/Hotels/:id
  getHotelsId(): Promise<void | Hotels> {
    const url = this.hotelsUrl;
    return this.http.get(url)
            .toPromise()
            .then(response => response as Hotels)
            .catch(this.handleError);
  }
  // Method GET/token/ using for assign user
  getToken() {
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }
  // Method POST/hotel/ create hotel 
  addHotels(hotel: Hotels): Observable<any> {
    const body = JSON.stringify(hotel);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.getToken();

    return this.http.post(this.hotelsUrl + token, body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
  // Error message method
  handleError(error: any) {
    const errMsg = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg);
  }
}
