import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiErrorDto } from '@modules/error/api-error.dto';
import { AuthGuard } from '@modules/auth/auth.guard';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get the current user',
    operationId: 'getMe',
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse({ type: ApiErrorDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getMe(@Req() request): Promise<UserDto> {
    const user = request.user as User;
    return UserDto.fromEntity(user);
  }
}
