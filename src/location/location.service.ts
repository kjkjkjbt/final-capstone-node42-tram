import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { cleanObject } from 'src/helpers/clean-object';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationDto } from './dto/location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
    prisma = new PrismaClient();

    async createLocation(createLocation: CreateLocationDto): Promise<LocationDto> {
        try {
            const result = await this.prisma.vi_tri.create({ data: createLocation });
            const newLocaton = {
                ...result,
                id: result.id
            }
            return newLocaton;
        } catch (error) {
            throw new InternalServerErrorException(`Failed to create location: ${error}`);
        }
    }

    async getLocationPagination(
        pageIndex: number,
        pageSize: number,
        keyword: string
    ): Promise<LocationDto[]> {
        try {
            const locations = await this.prisma.vi_tri.findMany({
                where: keyword
                    ? {
                        ten_vi_tri: {
                            contains: keyword
                        }
                    }
                    : {},
                skip: (pageIndex - 1) * pageSize,
                take: pageSize
            });
            return locations;
        } catch (error) {
            throw new Error('Failed to get list location');
        }
    }

    async getLocationById(id: number): Promise<LocationDto> {
        try {
            const location = await this.prisma.vi_tri.findFirst({
                where: { id }
            })

            if (!location) {
                throw new NotFoundException('Location not found!')
            }
            return location
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to get location by id with error: ${error}`);
        }
    }

    async deleteLocationById(id: number): Promise<void> {
        try {
            const location = await this.prisma.vi_tri.findUnique({
                where: { id },
            });

            if (!location) {
                throw new NotFoundException('Location not found');
            }

            await this.prisma.vi_tri.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to delete location: ${error.message}`);
        }
    }

    async updateLocation(id: number, updateLocationDto: UpdateLocationDto): Promise<LocationDto> {
        try {
            const localtion = await this.prisma.vi_tri.findUnique({
                where: { id },
            });

            if (!localtion) {
                throw new NotFoundException('Location not found');
            }

            const cleanedUpdateLocationDto = cleanObject(updateLocationDto);

            const updatedLocation = await this.prisma.vi_tri.update({
                where: { id },
                data: cleanedUpdateLocationDto,
            });

            return updatedLocation
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to update location: ${error.message}`);
        }
    }
}
