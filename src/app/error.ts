export class AuthError extends Error {
  name = 'AuthError';
  isAuth = false;
  code: number;
  message: string;
  stack = new Error().stack;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

export class DocumentError extends Error {
  name = 'DocumentError';
  code: number;
  message: string;
  stack = new Error().stack;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}
