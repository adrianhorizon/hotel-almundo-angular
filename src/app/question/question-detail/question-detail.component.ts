import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from '../question.model';
import { QuestionService } from '../question.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit, OnDestroy {

  question?: Question;
  loading = true;
  sub: any;
  data: any;
  endpoint: string;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.endpoint = environment.endPoint;
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.questionService
        .getQuestion(params.id)
        .then((question: Question) => {
          this.question = question;
          this.loading = false;
        });
    });

    return this.http.get(this.endpoint)
      .catch(error => Observable.throw('error'))
      .subscribe(res => this.data = res);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
