import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignUpRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsNotEmpty()
  @ApiProperty()
  public password: string;
}
