import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserNew } from './user-new.model';
import { AuthService } from '../signin/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupProcess: boolean;

  email = new FormControl('', [Validators.required, Validators.email]);

  signupForm: FormGroup;

  hide = true;

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(private authService: AuthService) {
    this.signupProcess = false;
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
        password: new FormControl(null, Validators.required),
        passwordSegurity: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.signupProcess = true;
        const { userName, firstName, email, password, passwordSegurity } = this.signupForm.value;
        const newuser = new UserNew(userName, firstName, email, password, passwordSegurity);
      if (password === passwordSegurity) {
        this.authService.signup(newuser)
        .subscribe(
          this.authService.login,
          this.authService.handleError
        );
      }
    }
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Ingrese su ' :
        this.email.hasError('email') ? 'Campo incorrecto ' :
            '';
  }
}
