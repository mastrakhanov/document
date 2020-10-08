import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IAppResult, IUser} from "../interface";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  authInfo: IAppResult;
  notAuth = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
}

  submit() {
    try {
      if (this.form.invalid) {
        return this.form;
      }

      const user: IUser = {
        name: this.form.value.name,
        password: this.form.value.password
      };

      this.auth.login(user);

      if (this.auth.isAuthenticated) {
        localStorage.setItem('user', JSON.stringify(user.name));
        this.form.reset();
        this.router.navigate(['/document']);
      }
    } catch (e) {
      this.notAuth = true;
      this.authInfo = {
        message: 'Неправильный логин или пароль'
      };
      console.log(e);
    }
  }

}
