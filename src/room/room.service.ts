import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { cleanObject } from 'src/helpers/clean-object';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomDto } from './dto/room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
    prisma = new PrismaClient();

    async getRoomPagination(
        pageIndex: number,
        pageSize: number,
        keyword: string
    ): Promise<RoomDto[]> {
        try {
            const rooms = await this.prisma.phong.findMany({
                where: keyword
                    ? {
                        ten_phong: {
                            contains: keyword
                        }
                    }
                    : {},
                skip: (pageIndex - 1) * pageSize,
                take: pageSize
            });
            return rooms;
        } catch (error) {
            throw new Error('Failed to get list room');
        }
    }

    async createRoom(createRoom: CreateRoomDto): Promise<RoomDto> {
        try {
            const result = await this.prisma.phong.create({ data: createRoom });
            const newRoom = {
                ...result,
                id: result.id
            }
            return newRoom;
        } catch (error) {
            throw new InternalServerErrorException(`Failed to create room: ${error}`);
        }
    }

    async getRoomById(id: number): Promise<RoomDto> {
        try {
            const room = await this.prisma.phong.findFirst({
                where: { id }
            })

            if (!room) {
                throw new NotFoundException('Room not found!')
            }
            return room
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to get location by id with error: ${error}`);
        }
    }

    async deleteRoomById(id: number): Promise<void> {
        try {
            const room = await this.prisma.phong.findUnique({
                where: { id },
            });

            if (!room) {
                throw new NotFoundException('Room not found');
            }

            await this.prisma.phong.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to delete room: ${error.message}`);
        }
    }

    async updateRoom(id: number, updateRoomDto: UpdateRoomDto): Promise<RoomDto> {
        try {
            const room = await this.prisma.phong.findUnique({
                where: { id },
            });

            if (!room) {
                throw new NotFoundException('Room not found');
            }

            const cleanedUpdateRoomDto = cleanObject(updateRoomDto);

            const updatedRoom = await this.prisma.phong.update({
                where: { id },
                data: cleanedUpdateRoomDto,
            });

            return updatedRoom
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to update room: ${error.message}`);
        }
    }
}
