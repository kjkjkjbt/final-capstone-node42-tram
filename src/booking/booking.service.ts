import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { cleanObject } from 'src/helpers/clean-object';
import { BookingDto } from './dto/booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
    prisma = new PrismaClient();

    async getRoomPagination(
        pageIndex: number,
        pageSize: number
    ): Promise<BookingDto[]> {
        try {
            const bookings = await this.prisma.dat_phong.findMany({
                skip: (pageIndex - 1) * pageSize,
                take: pageSize
            });
            return bookings;
        } catch (error) {
            throw new Error('Failed to get list room');
        }
    }

    async getBookingById(id: number): Promise<BookingDto> {
        try {
            const booking = await this.prisma.dat_phong.findFirst({
                where: { id }
            })

            if (!booking) {
                throw new NotFoundException('Booking not found!')
            }
            return booking
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to get booking by id with error: ${error}`);
        }
    }

    async createBooking(createBooking: CreateBookingDto): Promise<BookingDto> {
        try {
            const departure_date = new Date(createBooking.ngay_di);
            const date_arrival = new Date(createBooking.ngay_den);
            if (departure_date.getTime() < date_arrival.getTime()){
                throw new BadRequestException(`Failed to create booking: arrival date is later than departure date`);
            }
            const result = await this.prisma.dat_phong.create({ data: createBooking });
            const newBooking = {
                ...result,
                id: result.id
            }
            return newBooking;
        } catch (error) {
            throw new InternalServerErrorException(`${error.message}`);
        }
    }

    async deleteBookingById(id: number): Promise<void> {
        try {
            const booking = await this.prisma.dat_phong.findUnique({
                where: { id },
            });

            if (!booking) {
                throw new NotFoundException('Booking not found');
            }

            await this.prisma.dat_phong.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to delete booking: ${error.message}`);
        }
    }

    async updateBooking(id: number, updateBookingDto: UpdateBookingDto): Promise<BookingDto> {
        try {
            const booking = await this.prisma.dat_phong.findUnique({
                where: { id },
            });

            if (!booking) {
                throw new NotFoundException('Booking not found');
            }

            const departure_date = new Date(updateBookingDto.ngay_di);
            const date_arrival = new Date(updateBookingDto.ngay_den);
            if (departure_date.getTime() < date_arrival.getTime()){
                throw new BadRequestException(`Failed to update booking: arrival date is later than departure date`);
            }

            const cleanedUpdateBookingDto = cleanObject(updateBookingDto);

            const updatedBooking = await this.prisma.dat_phong.update({
                where: { id },
                data: cleanedUpdateBookingDto,
            });

            return updatedBooking
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to update booking: ${error.message}`);
        }
    }
}
