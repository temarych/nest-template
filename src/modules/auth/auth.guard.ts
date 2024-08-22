import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ApiErrorCode } from '@modules/error/api-error-code.enum';
import { ApiError } from '@modules/error/api-error.entity';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractAccessTokenFromHeader(request);

    if (!accessToken) throw new ApiError(ApiErrorCode.NoAccessToken);

    const result = await this.authService.authorize({ accessToken });

    request['user'] = result!.user;

    return true;
  }

  private extractAccessTokenFromHeader(request: Request): string | null {
    return request.headers.authorization ?? null;
  }
}
