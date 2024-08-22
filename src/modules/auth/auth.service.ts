import { Injectable } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { UserService } from '@modules/user/user.service';
import { ApiError } from '@modules/error/api-error.entity';
import { ApiErrorCode } from '@modules/error/api-error-code.enum';
import { HashService } from './hash/hash.service';
import { JwtService } from './jwt/jwt.service';
import {
  IAccessTokenPayload,
  IAuthorizeData,
  IAuthorizeResult,
  ILogInData,
  ILogInResult,
  ISignUpData,
  ISignUpResult,
} from './auth.service.types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  public async signUp(data: ISignUpData): Promise<ISignUpResult> {
    const isEmailUnique = await this.userService.isEmailUnique(data.email);

    if (!isEmailUnique) throw new ApiError(ApiErrorCode.EmailNotUnique);

    const password = await this.hashService.hash(data.password);

    const user = await this.userService.create({ ...data, password });

    const accessToken = this.jwtService.sign({ id: user.id });

    return { user, accessToken };
  }

  public async logIn(data: ILogInData): Promise<ILogInResult> {
    const user = await this.userService.findOneByEmail(data.email);

    if (!user) throw new ApiError(ApiErrorCode.EntityNotFound);

    const isCorrectPassword = await this.hashService.compare(
      data.password,
      user.password,
    );

    if (!isCorrectPassword) throw new ApiError(ApiErrorCode.IncorrectPassword);

    const accessToken = this.jwtService.sign({ id: user.id });

    return { user, accessToken };
  }

  public async authorize(data: IAuthorizeData): Promise<IAuthorizeResult> {
    const { error, result } = this.jwtService.verify<IAccessTokenPayload>(
      data.accessToken,
    );

    if (error && error instanceof TokenExpiredError) {
      throw new ApiError(ApiErrorCode.ExpiredAccessToken);
    }

    if (error && error instanceof JsonWebTokenError) {
      throw new ApiError(ApiErrorCode.InvalidAccessToken);
    }

    const user = await this.userService.findOne(result!.id);

    if (!user) throw new ApiError(ApiErrorCode.EntityNotFound);

    return { user };
  }
}
