import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Answer } from '../answer/answer.model';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class QuestionService {

  data: any;
  private questionsUrl: string;

  constructor(private http: HttpClient) {
    this.questionsUrl = environment.apiUrl + 'questions';
  }

  getQuestions(sort = '-createdAt'): Promise<void | Question[]> {
    return this.http.get(`${this.questionsUrl}?sort=${sort}`)
              .toPromise()
              .then(response => response as Question[])
              .catch(this.handleError);
  }

  getQuestion(id): Promise<void | Question> {
    const url = this.questionsUrl + id;
    return this.http.get(url)
            .toPromise()
            .then(response => response as Question)
            .catch(this.handleError);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }

  addQuestion(question: Question) {
    const body = JSON.stringify(question);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.getToken();

    return this.http.post(this.questionsUrl + token, body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  addAnswer(answer: Answer) {
    const a = {
      description: answer.description,
      question: {
        _id: answer.question._id
      }
    };
    const body = JSON.stringify(a);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.questionsUrl + answer.question._id + 'answers';
    const token = this.getToken();

    return this.http.post(url + token, body, { headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  handleError(error: any) {
    const errMsg = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg);
  }
}
