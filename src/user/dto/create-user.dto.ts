import {IsString, IsEmail, IsEnum} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enum/gender.enum';
import { Role } from '../enum/role.enum';

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    full_name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    pass_word: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    birth_day: string;

    @ApiProperty({enum: Gender})
    @IsEnum(Gender)
    gender: Gender;

    @ApiProperty({enum: Role})
    @IsEnum(Role)
    role: Role;
}