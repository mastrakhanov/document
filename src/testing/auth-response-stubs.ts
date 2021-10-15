import { IAuthResponse } from '../app/interface';


export const authLoginResponseStub: IAuthResponse = {
  status: 200,
  isAuth: true,
  message: 'Авторизация пройдена'
};

export const authLogoutResponseStub: IAuthResponse = {
  status: 200,
  isAuth: false,
  message: 'Выход выполнен'
};
