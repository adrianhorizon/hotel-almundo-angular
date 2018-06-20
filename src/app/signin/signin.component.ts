import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './user.model';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginInProcess: any;
  email = new FormControl('', [Validators.required, Validators.email]);
  // crea un object
  signinForm: FormGroup;
  // hide para ocultar la contraseña
  hide = true;
  error = '';

  constructor(private authService: AuthService, public snackBar: MatSnackBar) {
    this.loginInProcess = false;
   }

  ngOnInit() {
      // formgroup le pasamos un object json
      this.signinForm = new FormGroup({
          email: new FormControl(null, [
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
          ]),
          password: new FormControl(null, Validators.required)
      });
  }

  onSubmit() {
    this.loginInProcess = false;
    if (this.signinForm.valid) {
      this.loginInProcess = true;
      const { email, password } = this.signinForm.value;
      const user = new User(email, password);
      this.authService.signin(user)
      .subscribe( result => {
        if (result = true) {
          this.authService.signin(user)
          .subscribe(
            this.authService.login,
          );
        } else {
          this.error = 'Email o Contraseña incorrecta';
          this.snackBar.open('Email o Contraseña incorrecta', '', {
            duration: 2500
          });
          this.loginInProcess = false;
        }
      }, e => {
        this.error = 'Credenciales incorrectas';
        this.snackBar.open('Email o Contraseña incorrecta', '', {
          duration: 2500,
          extraClasses: ['success-snackbar']
        });
        this.loginInProcess = false;
      });
    }
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Ingrese su ' :
        this.email.hasError('email') ? 'Campo incorrecto ' :
            '';
  }
}
