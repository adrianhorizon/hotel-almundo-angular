import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HotelService } from '../hotels/hotels.service';
import { Hotels } from '../hotels/hotels.model';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  Start = '../../assets/icons/filters/star.svg';
  stars = [
    {
      icon: 'star star star star star'
    },
    {
      icon: 'star star star star'
    },
    {
      icon: 'star star star'
    },
    {
      icon: 'star star'
    },
    {
      icon: 'star'
    }
  ];
  data: any;
  step = 0;
  hotels: Hotels[];
  loading = true;

  constructor(private hotelService: HotelService) { }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ControlHotel = new FormControl();
  filteredOptions: Observable<Hotels[]>;

  ngOnInit() {
    this.hotelService
    .getHotel()
    .then((hotels: Hotels[]) => {
      this.hotels = hotels;
      this.loading = false;
    });

    this.filteredOptions = this.ControlHotel.valueChanges
      .pipe(
        startWith<string | Hotels>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filter(name) : this.hotels)
      );
  }

  filter(name: string): Hotels[] {
    return this.hotels.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

}
