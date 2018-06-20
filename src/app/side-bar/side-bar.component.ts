import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  stars = [
    {
      icon: 'start start start start start'
    },
    {
      icon: 'start start start start'
    },
    {
      icon: 'start start start'
    },
    {
      icon: 'start star_rate'
    },
    {
      icon: 'starts'
    }
  ];
  data: any;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  constructor(private http: HttpClient) {
  }

  ngOnInit() {

    /* return this.http.get(this.jsonpoint)
      .catch(error => Observable.throw('error'))
      .subscribe(res => this.data = res); */
  }

}
