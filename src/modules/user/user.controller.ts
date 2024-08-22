import { Controller, Get } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiError } from '@modules/error/api-error.entity';
import { ApiErrorCode } from '@modules/error/api-error-code.enum';
import { ApiErrorDto } from '@modules/error/api-error.dto';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({
    summary: 'Get the current user',
    operationId: 'getMe',
  })
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse({ type: ApiErrorDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getMe() {
    const user = await this.userService.findOne('66c6fab4f13bf5134c167e8c');
    if (!user) throw new ApiError(ApiErrorCode.EntityNotFound);
    return UserDto.fromEntity(user);
  }
}
