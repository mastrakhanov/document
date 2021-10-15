export class AuthError {
  name = 'AuthError';
  isAuth = false;
  code: number;
  message: string;
  stack = new Error().stack;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}

export class DocumentError {
  name = 'DocumentError';
  code: number;
  message: string;
  stack = new Error().stack;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}
