import { Component, OnInit } from '@angular/core';
import { AuthService } from '../signin/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  ngOnInit() { }

  constructor(private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  fullName() {
    return this.authService.currentUser.fullName();
  }

  logout() {
    this.authService.logout();
  }

}
