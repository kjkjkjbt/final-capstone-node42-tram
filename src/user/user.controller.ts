import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from 'src/helpers/response';
import { getStorageOptions } from 'src/shared/file-upload.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService ) { }

  @Get()
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  async userPagination(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
    @Res() res: Response
  ): Promise<Response<UserDto[]>> {
    try {
      const page = pageIndex ? Number(pageIndex) : 1;
      const size = pageSize ? Number(pageSize) : 10;
      let userDto = await this.userService.userPagination(page, size, keyword);

      return res.status(HttpStatus.OK).json(userDto)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
    }
  }

  @Post()
  @ApiOperation({ summary: 'Admin create a new user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response
  ): Promise<Response<UserDto>> {
    try {
      const user = await this.userService.createUser(createUserDto);

      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad Request', error: error.message });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by user_id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get user by id successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error get user by id' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async getUserById(
    @Param('id') id: number,
    @Res() res: Response
  ): Promise<Response<UserDto>> {
    try {
      const userId = Number(id);
      let user = await this.userService.getUserById(userId);

      return sendSuccessResponse(res, user, 'User found', HttpStatus.OK);
    } catch (error) {
      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      if (error instanceof NotFoundException) {
        statusCode = HttpStatus.NOT_FOUND;
      }
      return sendErrorResponse(res, error, statusCode);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async deleteUserById(
    @Param('id') id: number,
    @Res() res: Response
  ): Promise<Response<void>> {
    try {
      const userId = Number(id);
      await this.userService.deleteUserById(userId);
      return sendSuccessResponse(res, null, 'User deleted successfully', HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return sendErrorResponse(res, error, HttpStatus.NOT_FOUND);
      }
      return sendErrorResponse(res, error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response
  ): Promise<Response<UserDto>> {
    try {
      const userId = Number(id);
      const user = await this.userService.updateUser(userId, updateUserDto);
      return sendSuccessResponse(res, user, 'User updated successfully', HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return sendErrorResponse(res, error, HttpStatus.NOT_FOUND);
      }
      return sendErrorResponse(res, error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/upload-avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'integer'
        },
        file: {
          type: 'string',
          format: 'binary'
        }
      },
      required: ['userId', 'file']
    }
  })
  @UseInterceptors(FileInterceptor('file', {storage: getStorageOptions('avatar')}))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File){
    return {
      filename: file.originalname,
      path: `/public/img/${file.originalname}`
    }
  }
}
