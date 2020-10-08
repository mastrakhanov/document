import { Injectable } from '@angular/core';
import {IAppResult, IUser} from "./interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  notAuthenticated = false;
  registeredUser = {
    name: 'ivanov',
    password: 'ivanov'
  };

  login(user: IUser): IAppResult {
    if (user.name === this.registeredUser.name && user.password === this.registeredUser.password) {
      this.isAuthenticated = true;
      this.notAuthenticated = false;
      return {
        status: 200,
        isAuth: true,
        message: 'Авторизация пройдена'
      }
    } else {
      this.notAuthenticated = true;
      throw {
        status: 401,
        isAuth: false,
        error: 'Ошибка авторизации'
      }
    }
  }

  logout(): IAppResult {
    if (this.isAuthenticated) {
      this.isAuthenticated = false;
      this.notAuthenticated = false;
      return {
        status: 200,
        message: 'Выход выполнен'
      }
    }
  }

}
