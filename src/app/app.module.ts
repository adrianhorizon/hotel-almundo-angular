import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
// Routing path, children routes
import { Routing } from './app.routing';

import { AuthService } from './signin/auth.service';
import { HotelService } from './hotels/hotels.service';

import 'hammerjs';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { Page404Component } from './page404/page404.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PrincipalPageComponent } from './principal-page/principal-page.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelsListComponent } from './hotels/hotels-list/hotels-list.component';
import { HotelsDetailsComponent } from './hotels/hotels-details/hotels-details.component';

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    TopBarComponent,
    PrincipalPageComponent,
    SigninComponent,
    SignupComponent,
    SideBarComponent,
    HotelsComponent,
    HotelsListComponent,
    HotelsDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    HotelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
