import { QuestionComponent } from './question.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';

export const QUESTION_ROUTES = [
  { path: '', component: QuestionComponent },
  { path: ':id', component: QuestionDetailComponent }
];
