import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiErrorDto } from '@modules/error/api-error.dto';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/signup.request.dto';
import { LogInRequestDto } from './dto/login.request.dto';
import { SignUpResponseDto } from './dto/signup.response.dto';
import { LogInResponseDto } from './dto/login.response.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Sign up',
    operationId: 'signup',
    tags: ['auth'],
  })
  @ApiOkResponse({ type: SignUpResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  @ApiBadRequestResponse({ type: ApiErrorDto })
  public async signUp(@Body() data: SignUpRequestDto) {
    const result = await this.authService.signUp(data);
    return SignUpResponseDto.fromResult(result!);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Log in',
    operationId: 'login',
    tags: ['auth'],
  })
  @ApiOkResponse({ type: LogInResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  @ApiBadRequestResponse({ type: ApiErrorDto })
  public async logIn(@Body() data: LogInRequestDto) {
    const result = await this.authService.logIn(data);
    return LogInResponseDto.fromResult(result!);
  }
}
