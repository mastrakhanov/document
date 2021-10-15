import { TestBed } from '@angular/core/testing';

import { IUser } from '../interface';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  let authService: AuthService;
  let storageService: StorageService;

  const user: IUser = { name: 'ivanov', password: 'ivanov123' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AuthService,
        StorageService
      ]
    });
    authService = TestBed.inject(AuthService);
    storageService = TestBed.inject(StorageService);
  });

  it('should create', () => {
    expect(authService).toBeTruthy();
  });

  it('login() should call storageService set() and return object', () => {
    spyOn(storageService, 'set');

    expect(authService.login(user)).toEqual({
      status: 200,
      isAuth: authService.isAuthenticated,
      message: 'Авторизация пройдена'
    });
    expect(authService.isAuthenticated).toBeTrue();
    expect(storageService.set).toHaveBeenCalledWith('authenticate', true);
  });

  it('logout() should call storageService set() and return object', () => {
    spyOn(storageService, 'set');

    authService.isAuthenticated = true;

    expect(authService.logout()).toEqual({
      status: 200,
      isAuth: authService.isAuthenticated,
      message: 'Выход выполнен'
    });
    expect(authService.isAuthenticated).toBeFalse();
    expect(storageService.set).toHaveBeenCalledWith('authenticate', false);
  });
});
