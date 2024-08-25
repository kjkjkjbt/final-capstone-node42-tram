import { Body, Controller, HttpStatus, Post, Res, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from 'src/helpers/response';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  @ApiOperation({ summary: 'Login user by email' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Login successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Login fail' })
  async login(
    @Body() body: LoginDto,
    @Res() res: Response
  ): Promise<any> {
    try {
      const result = await this.authService.login(body);
      return sendSuccessResponse(res, result);
    } catch (error) {
      const statusCode = error instanceof UnauthorizedException ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;
      return sendErrorResponse(res, error.message, statusCode);
    }
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async createUser(
    @Body() createUserDto: RegisterDto,
    @Res() res: Response
  ): Promise<Response<UserDto>> {
    try {
      const user = await this.authService.signUp(createUserDto);

      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad Request', error: error.message });
    }
  }
}
