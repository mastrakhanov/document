import { authLoginResponseStub, authLogoutResponseStub } from './auth-response-stubs';
import { IAuthResponse, IUser } from '../app/interface';


export  class MockAuthService {

  isAuthenticated = true;

  login = (user: IUser): IAuthResponse | Error => authLoginResponseStub;

  logout = (): IAuthResponse | Error => authLogoutResponseStub;

}
