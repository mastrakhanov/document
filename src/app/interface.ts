export interface IUser {
  name: string;
  password: string
}

export interface IDocument {
  status: number;
  title?: string;
  text1?: string;
  text2?: string;
  error?: string
}

export interface IParam {
  approver: string;
  resolution: string;
  comment: string;
  state: number
}

export interface IAppResult {
  status?: number;
  isAuth? :boolean;
  message?: string;
  error?: string
}
