import {
  IAuthorizeData,
  IAuthorizeResult,
  ILogInData,
  ILogInResult,
  ISignUpData,
  ISignUpResult,
} from './auth.service.types';

export interface IAuthService {
  signUp(data: ISignUpData): Promise<ISignUpResult>;
  logIn(data: ILogInData): Promise<ILogInResult>;
  authorize(data: IAuthorizeData): Promise<IAuthorizeResult>;
}
