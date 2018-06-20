import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Answer } from './answer.model';
import { Question } from '../question/question.model';
import { QuestionService } from '../question/question.service';
import { AuthService } from '../signin/auth.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() question: Question;

  constructor(private questionService: QuestionService, private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
    }

    const answer = new Answer(
      form.value.description,
      this.question
    );
    this.questionService
      .addAnswer(answer)
      .subscribe(
        a => {
          this.question.answers.unshift(a);
        },
        this.authService.handleError
      );
    form.reset();
  }

  ngOnInit() {
  }

}
