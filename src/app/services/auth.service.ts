import { Injectable } from '@angular/core';

import { IAuthResponse, IUser } from '../interface';
import { AuthError } from '../error';
import { StorageService } from './storage.service';


@Injectable({ providedIn: 'root' })
export class AuthService {

  isAuthenticated: boolean;

  private registeredUser: IUser = {
    name: 'ivanov',
    password: 'ivanov123'
  };

  constructor(private readonly storageService: StorageService) {
    this.isAuthenticated = this.storageService.get('authenticate') as boolean || false;
    setTimeout(() => { this.logout(); }, 3_600_000);
  }

  login(user: IUser): IAuthResponse {
    if (user.name === this.registeredUser.name && user.password === this.registeredUser.password) {
      this.isAuthenticated = true;
      this.storageService.set('authenticate', true);
      return {
        status: 200,
        isAuth: this.isAuthenticated,
        message: 'Авторизация пройдена'
      };
    } else {
      this.isAuthenticated = false;
      this.storageService.set('authenticate', false);
      throw new AuthError(401, 'Ошибка авторизации');
    }
  }

  logout(): IAuthResponse {
    this.isAuthenticated = false;
    this.storageService.set('authenticate', false);
    return {
      status: 200,
      isAuth: this.isAuthenticated,
      message: 'Выход выполнен'
    };
  }

}
