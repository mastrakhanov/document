import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IUser } from '../interface';
import { AuthService } from '../services/auth.service';


type Message = { message: string };

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  authMessage: Message = {} as Message;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.router.navigateByUrl('/document');
    }
  }

  submit(): FormGroup | void {
    try {
      if (this.form.invalid) {
        return this.form;
      }

      const user: IUser = {
        name: this.form.value.name,
        password: this.form.value.password
      };

      this.authService.login(user);

      if (this.authService.isAuthenticated) {
        this.form.reset();
        this.router.navigateByUrl('/document');
      }
    } catch (error) {
      this.authMessage = {
        message: 'Неправильный логин или пароль'
      };

      console.error(error);
    }
  }

}
