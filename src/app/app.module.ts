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
import { QuestionService } from './question/question.service';

import 'hammerjs';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { Page404Component } from './page404/page404.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PrincipalPageComponent } from './principal-page/principal-page.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { QuestionComponent } from './question/question.component';
import { QuestionDetailComponent } from './question/question-detail/question-detail.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    TopBarComponent,
    PrincipalPageComponent,
    SigninComponent,
    SignupComponent,
    QuestionComponent,
    QuestionDetailComponent,
    QuestionListComponent,
    SideBarComponent
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
    QuestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
