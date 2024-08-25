import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
    @IsNotEmpty({ message: 'tên phòng không được bỏ trống!' })
    @ApiProperty()
    ten_phong: string;

    @IsNotEmpty({ message: 'số lượng khách không được bỏ trống!' })
    @ApiProperty()
    khach: number;

    @IsNotEmpty({ message: 'số lượng phòng ngủ không được bỏ trống!' })
    @ApiProperty()
    phong_ngu: number;

    @IsNotEmpty({ message: 'số lượng giường không được bỏ trống!' })
    @ApiProperty()
    giuong: number;

    @IsNotEmpty({ message: 'số lượng phòng tắm không được bỏ trống!' })
    @ApiProperty()
    phong_tam: number;

    @ApiProperty()
    mo_ta: string;

    @IsNotEmpty({ message: 'giá tiền không được bỏ trống!' })
    @ApiProperty()
    gia_tien: number;

    @IsNotEmpty({ message: 'không được bỏ trống thông tin có dùng máy giặt hay không' })
    @ApiProperty()
    may_giat: boolean;

    @IsNotEmpty({ message: 'không được bỏ trống thông tin có dùng bàn là hay không' })
    @ApiProperty()
    ban_la: boolean;

    @IsNotEmpty({ message: 'không được bỏ trống thông tin có dùng tivi hay không' })
    @ApiProperty()
    tivi: boolean;

    @IsNotEmpty({ message: 'không được bỏ trống thông tin có dùng điều hòa hay không' })
    @ApiProperty()
    dieu_hoa: boolean;

    @IsNotEmpty({ message: 'không được bỏ trống thông tin có dùng wifi hay không' })
    @ApiProperty()
    wifi: boolean;

    @IsNotEmpty({ message: 'không được bỏ trống thông tin có dùng bếp hay không' })
    @ApiProperty()
    bep: boolean;

    @IsNotEmpty({ message: 'không được bỏ trống thông tin có đỗ xe hay không' })
    @ApiProperty()
    do_xe: boolean;

    @IsNotEmpty({ message: 'không được bỏ trống thông tin có dùng hồ bơi hay không' })
    @ApiProperty()
    ho_boi: boolean;

    @IsNotEmpty({ message: 'không được bỏ trống thông tin có dùng bàn ủi hay không' })
    @ApiProperty()
    ban_ui: boolean;

    @ApiProperty()
    ma_vi_tri: number;

    @ApiProperty()
    hinh_anh: string;
}