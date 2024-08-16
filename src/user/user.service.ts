import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config'
import { UpdateUserDto } from './dto/update-user.dto';
import { cleanObject } from 'src/helpers/clean-object';

@Injectable()
export class UserService {
    prisma = new PrismaClient();
    private readonly SALT_OR_ROUNDS: number;

    constructor(private configService: ConfigService) {
        this.SALT_OR_ROUNDS = Number(this.configService.get<string>('SALT_OR_ROUNDS'));
    }

    async userPagination(
        pageIndex: number,
        pageSize: number,
        keyword: string
    ): Promise<UserDto[]> {
        try {
            const users = await this.prisma.nguoi_dung.findMany({
                where: keyword
                    ? {
                        full_name: {
                            contains: keyword
                        }
                    }
                    : {},
                skip: (pageIndex - 1) * pageSize,
                take: pageSize
            });
            return users.map(user => plainToClass(UserDto, user));
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    }

    async createUser(createUser: CreateUserDto): Promise<UserDto> {
        try {
            const existUser = await this.prisma.nguoi_dung.findFirst({
                where: {
                    email: createUser.email
                }
            })
            if (existUser) {
                throw new ConflictException('User is existed!');
            }
            const hashPassword = bcrypt.hashSync(createUser.pass_word, this.SALT_OR_ROUNDS);
            createUser.pass_word = hashPassword;

            const newUser = await this.prisma.nguoi_dung.create({ data: createUser })
            return plainToClass(UserDto, newUser);
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to create user ${error}`);
        }
    }

    async getUserById(id: number): Promise<UserDto> {
        try {
            const user = await this.prisma.nguoi_dung.findFirst({
                where: { id }
            })

            if (!user) {
                throw new NotFoundException('User not found!')
            }
            return plainToClass(UserDto, user);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to get user by id with error: ${error}`);
        }
    }

    async deleteUserById(id: number): Promise<void> {
        try {
            const user = await this.prisma.nguoi_dung.findUnique({
                where: { id },
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            await this.prisma.nguoi_dung.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to delete user: ${error.message}`);
        }
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
        try {
            const user = await this.prisma.nguoi_dung.findUnique({
                where: { id },
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            if (updateUserDto.pass_word) {
                updateUserDto.pass_word = bcrypt.hashSync(updateUserDto.pass_word, this.SALT_OR_ROUNDS);
            }

            const cleanedUpdateUserDto = cleanObject(updateUserDto);

            const updatedUser = await this.prisma.nguoi_dung.update({
                where: { id },
                data: cleanedUpdateUserDto,
            });

            return plainToClass(UserDto, updatedUser);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to update user: ${error.message}`);
        }
    }
}
