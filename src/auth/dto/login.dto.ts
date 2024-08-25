import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email không đúng định dạng!' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'Password không được bỏ trống!' })
  @ApiProperty()
  pass_word: string;
}