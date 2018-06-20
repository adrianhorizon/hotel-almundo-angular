import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { UserNew } from '../signup/user-new.model';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  usersUrl: string;
  currentUser?: User;

  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) {
    this.usersUrl = environment.apiUrl + 'auth/';
    if (this.isLoggedIn()) {
      const { userId, email, firstName, userName } = JSON.parse(localStorage.getItem('user'));
      this.currentUser = new User(email, null, firstName, userName, userId);
    }
  }

  signup(usernew: UserNew): Observable<any> {
    const body = JSON.stringify(usernew);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.usersUrl + 'signup', body, { headers: headers });
  }

  signin(user: User): Observable<any> {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.usersUrl + 'signin', body, { headers: headers });
  }

  login = ({ token, userId, userName, firstName, email }) => {
    this.currentUser = new User(email, null, userName, firstName, userId);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ userId, userName, firstName, email }));
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigateByUrl('/signin');
  }

  showError(message) {
    this.snackBar.open(message, 'x', { duration: 2500 });
  }

  public handleError = (error: any) => {
    const { error: { name }, message } = error;
    if (name === 'TokenExpiredError') {
      this.showError('Tu sesión ha expirado');
    } else if (name === 'JsonWebTokenError') {
      this.showError('Ha habido un problema con tu sesión');
    } else {
      this.showError(message || 'Ha ocurrido un error. Inténtalo nuevamente');
    }
    this.logout();
  }
}
