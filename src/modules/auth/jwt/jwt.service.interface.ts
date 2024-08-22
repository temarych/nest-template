import { Result } from '@typings/result';

export interface IJwtService {
  sign<T extends object>(payload: T): string;
  verify<T extends object>(token: string): Result<T, Error>;
}
