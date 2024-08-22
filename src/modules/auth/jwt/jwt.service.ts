import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { Result } from '@typings/result';
import { IJwtService } from './jwt.service.interface';

@Injectable()
export class JwtService implements IJwtService {
  public sign<T extends object>(payload: T): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  public verify<T extends object>(token: string): Result<T, Error> {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as T;
      return { error: null, result: payload };
    } catch (error) {
      return { error: error as Error, result: null };
    }
  }
}
