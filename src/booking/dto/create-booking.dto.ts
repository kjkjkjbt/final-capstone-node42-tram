import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
    @IsNotEmpty({ message: 'mã phòng không được bỏ trống!' })
    @ApiProperty()
    ma_phong: number;

    @IsNotEmpty({ message: 'ngày đến không được bỏ trống!' })
    @ApiProperty()
    ngay_den: Date;

    @IsNotEmpty({ message: 'ngày đi không được bỏ trống!' })
    @ApiProperty()
    ngay_di: Date;

    @IsNotEmpty({ message: 'số lượng khách không được bỏ trống!' })
    @ApiProperty()
    so_luong_khach: number;

    @ApiProperty()
    ma_nguoi_dat: number;
}