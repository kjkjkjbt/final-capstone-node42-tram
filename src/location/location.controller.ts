import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from 'src/helpers/response';
import { getStorageOptions } from 'src/shared/file-upload.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationDto } from './dto/location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationService } from './location.service';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async createUser(
    @Body() createLocation: CreateLocationDto,
    @Res() res: Response
  ): Promise<Response<LocationDto>> {
    try {
      const newLocation = await this.locationService.createLocation(createLocation);

      return res.status(HttpStatus.CREATED).json(newLocation);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad Request', error: error.message });
    }
  }

  @Get()
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiOperation({ summary: 'Get list location' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get list successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'internal server' })
  async locationPagination(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
    @Res() res: Response
  ): Promise<Response<LocationDto[]>> {
    try {
      const page = pageIndex ? Number(pageIndex) : 1;
      const size = pageSize ? Number(pageSize) : 10;
      let locations = await this.locationService.getLocationPagination(page, size, keyword);

      return res.status(HttpStatus.OK).json(locations)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by user_id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get location by id successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error get location by id' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Location not found' })
  async getLocationById(
    @Param('id') id: number,
    @Res() res: Response
  ): Promise<Response<LocationDto>> {
    try {
      const userId = Number(id);
      let user = await this.locationService.getLocationById(userId);

      return sendSuccessResponse(res, user, 'Location found', HttpStatus.OK);
    } catch (error) {
      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      if (error instanceof NotFoundException) {
        statusCode = HttpStatus.NOT_FOUND;
      }
      return sendErrorResponse(res, error, statusCode);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a location by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Location deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Location not found' })
  async deleteLocationById(
    @Param('id') id: number,
    @Res() res: Response
  ): Promise<Response<void>> {
    try {
      const locationId = Number(id);
      await this.locationService.deleteLocationById(locationId);
      return sendSuccessResponse(res, null, 'Location deleted successfully', HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return sendErrorResponse(res, error, HttpStatus.NOT_FOUND);
      }
      return sendErrorResponse(res, error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a location by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Location updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Location not found' })
  async updateUser(
    @Param('id') id: number,
    @Body() updateLocationDto: UpdateLocationDto,
    @Res() res: Response
  ): Promise<Response<LocationDto>> {
    try {
      const locationId = Number(id);
      const locationUpdated = await this.locationService.updateLocation(locationId, updateLocationDto);
      return sendSuccessResponse(res, locationUpdated, 'Location updated successfully', HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return sendErrorResponse(res, error, HttpStatus.NOT_FOUND);
      }
      return sendErrorResponse(res, error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/upload-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'integer'
        },
        locationId: {
          type: 'integer'
        },
        file: {
          type: 'string',
          format: 'binary'
        }
      },
      required: ['userId', 'locationId', 'file']
    }
  })
  @UseInterceptors(FileInterceptor('file', { storage: getStorageOptions('location') }))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.originalname,
      path: `/public/img/${file.originalname}`
    }
  }
}
