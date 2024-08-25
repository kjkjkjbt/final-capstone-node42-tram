import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from 'src/helpers/response';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@ApiTags("Booking")
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiOperation({ summary: 'Get list booking' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get list successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'internal server' })
  async bookingPagination(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Res() res: Response
  ): Promise<Response<BookingDto[]>> {
    try {
      const page = pageIndex ? Number(pageIndex) : 1;
      const size = pageSize ? Number(pageSize) : 10;
      let locations = await this.bookingService.getRoomPagination(page, size);

      return res.status(HttpStatus.OK).json(locations)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by bookingId' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get booking by id successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error get booking by id' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'booking not found' })
  async getLocationById(
    @Param('id') id: number,
    @Res() res: Response
  ): Promise<Response<BookingDto>> {
    try {
      const bookingId = Number(id);
      let booking = await this.bookingService.getBookingById(bookingId);

      return sendSuccessResponse(res, booking, 'Booking found', HttpStatus.OK);
    } catch (error) {
      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      if (error instanceof NotFoundException) {
        statusCode = HttpStatus.NOT_FOUND;
      }
      return sendErrorResponse(res, error, statusCode);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Booking created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async createUser(
    @Body() createBooking: CreateBookingDto,
    @Res() res: Response
  ): Promise<Response<BookingDto>> {
    try {
      const newBooking = await this.bookingService.createBooking(createBooking);

      return res.status(HttpStatus.CREATED).json(newBooking);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad Request', error: error.message });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Booking deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Booking not found' })
  async deleteLocationById(
    @Param('id') id: number,
    @Res() res: Response
  ): Promise<Response<void>> {
    try {
      const bookingId = Number(id);
      await this.bookingService.deleteBookingById(bookingId);
      return sendSuccessResponse(res, null, 'Booking deleted successfully', HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return sendErrorResponse(res, error, HttpStatus.NOT_FOUND);
      }
      return sendErrorResponse(res, error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a booking by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Booking updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Booking not found' })
  async updateUser(
    @Param('id') id: number,
    @Body() updateBookingDto: UpdateBookingDto,
    @Res() res: Response
  ): Promise<Response<BookingDto>> {
    try {
      const bookingId = Number(id);
      const locationUpdated = await this.bookingService.updateBooking(bookingId, updateBookingDto);
      return sendSuccessResponse(res, locationUpdated, 'Booking updated successfully', HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return sendErrorResponse(res, error, HttpStatus.NOT_FOUND);
      }
      return sendErrorResponse(res, error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
