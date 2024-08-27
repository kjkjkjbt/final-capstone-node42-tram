import { Controller, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { Body, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from 'src/helpers/response';
import { getStorageOptions } from 'src/shared/file-upload.service';
import { RoomDto } from './dto/room.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Get()
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiOperation({ summary: 'Get list room' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get list successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'internal server' })
  async roomPagination(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
    @Res() res: Response
  ): Promise<Response<RoomDto[]>> {
    try {
      const page = pageIndex ? Number(pageIndex) : 1;
      const size = pageSize ? Number(pageSize) : 10;
      let rooms = await this.roomService.getRoomPagination(page, size, keyword);

      return res.status(HttpStatus.OK).json(rooms)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Room created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async createRoom(
    @Body() createRoom: CreateRoomDto,
    @Res() res: Response
  ): Promise<Response<RoomDto>> {
    try {
      const newRoom = await this.roomService.createRoom(createRoom);

      return res.status(HttpStatus.CREATED).json(newRoom);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad Request', error: error.message });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a room by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get room by id successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error get room by id' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Room not found' })
  async getRoomById(
    @Param('id') id: number,
    @Res() res: Response
  ): Promise<Response<RoomDto>> {
    try {
      const userId = Number(id);
      let user = await this.roomService.getRoomById(userId);

      return sendSuccessResponse(res, user, 'Room found', HttpStatus.OK);
    } catch (error) {
      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      if (error instanceof NotFoundException) {
        statusCode = HttpStatus.NOT_FOUND;
      }
      return sendErrorResponse(res, error, statusCode);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a room by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Room deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Room not found' })
  async deleteRoomById(
    @Param('id') id: number,
    @Res() res: Response
  ): Promise<Response<void>> {
    try {
      const roomId = Number(id);
      await this.roomService.deleteRoomById(roomId);
      return sendSuccessResponse(res, null, 'Room deleted successfully', HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return sendErrorResponse(res, error, HttpStatus.NOT_FOUND);
      }
      return sendErrorResponse(res, error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({ summary: 'Update a room by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Room updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Room not found' })
  async updateRoom(
    @Param('id') id: number,
    @Body() updateRoomDto: UpdateRoomDto,
    @Res() res: Response
  ): Promise<Response<RoomDto>> {
    try {
      const roomId = Number(id);
      const roomUpdated = await this.roomService.updateRoom(roomId, updateRoomDto);
      return sendSuccessResponse(res, roomUpdated, 'Room updated successfully', HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return sendErrorResponse(res, error, HttpStatus.NOT_FOUND);
      }
      return sendErrorResponse(res, error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/upload-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'integer'
        },
        roomId: {
          type: 'integer'
        },
        file: {
          type: 'string',
          format: 'binary'
        }
      },
      required: ['userId', 'roomId', 'file']
    }
  })
  @UseInterceptors(FileInterceptor('file', { storage: getStorageOptions('room') }))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.originalname,
      path: `/public/img/${file.originalname}`
    }
  }
}
