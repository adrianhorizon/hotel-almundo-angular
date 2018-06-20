import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../question.model';
import { QuestionService } from '../question.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  data: any;
  endpoint: string;

  constructor(private questionService: QuestionService, private http: HttpClient) {
    this.endpoint = environment.endPoint;
   }

  @Input() sort = '-createdAt';
  questions: Question[];
  loading = true;

  ngOnInit() {
      this.questionService
      .getQuestions(this.sort)
      .then((questions: Question[]) => {
        this.questions = questions;
        this.loading = false;
      });

      return this.http.get(this.endpoint)
      .catch(error => Observable.throw('error'))
      .subscribe(res => this.data = res);
  }

}
