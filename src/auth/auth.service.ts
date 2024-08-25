import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';
import { Role } from 'src/user/enum/role.enum';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    prisma = new PrismaClient();
    private readonly SALT_OR_ROUNDS: number;
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ){
        this.SALT_OR_ROUNDS = Number(this.configService.get<string>('SALT_OR_ROUNDS'));
    }

    async login(body: LoginDto): Promise<string> {
        try {
            const { email, pass_word } = body;
            const user = await this.prisma.nguoi_dung.findFirst({
                where: { email }
            });

            if (!user) {
                throw new UnauthorizedException("Email không đúng hoặc không hợp lệ");
            }

            const checkPass = bcrypt.compareSync(pass_word, user.pass_word);
            if (!checkPass) {
                throw new UnauthorizedException("Password không hợp lệ");
            }

            const payload = {
                id: user.id,
                email,
                full_name: user.full_name,
                role: user.role,
            };

            const token = this.jwtService.sign(
                { data: payload },
                {
                    expiresIn: this.configService.get('EXPIRES_IN'),
                    secret: this.configService.get('SECRET_KEY')
                }
            );

            return token;
        } catch (error) {
            throw error;
        }
    }

    async signUp(createUser: RegisterDto): Promise<UserDto> {
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
            const newUser = {
                ...createUser,
                role: Role.USER
            }

            const result = await this.prisma.nguoi_dung.create({ data: newUser })
            return plainToClass(UserDto, result);
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to create user ${error}`);
        }
    }
}
