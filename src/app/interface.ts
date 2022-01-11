export interface IUser {
  name: string;
  password: string;
}

export interface IDocument {
  id?: number;
  status?: number;
  title: string;
  text: string;
  description: string;
  error?: string;
}

export enum ApproveOptions {
  Rejected,
  Approved
}

export interface IParam {
  resolution: string;
  comment: string;
  state: ApproveOptions;
}

export interface IApprove {
  status: number;
  message: string;
  resolution: string;
  comment: string;
}

export interface IResponse {
  status: number;
  message: string;
  error?: string;
}

export interface IAuthResponse {
  status: number;
  isAuth: boolean;
  message: string;
  error?: string;
}
