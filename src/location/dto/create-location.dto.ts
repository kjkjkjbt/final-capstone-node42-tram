import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
    @IsNotEmpty({ message: 'tỉnh thành không được bỏ trống!' })
    @ApiProperty()
    tinh_thanh: string;

    @IsNotEmpty({ message: 'tên vị trí không được bỏ trống!' })
    @ApiProperty()
    ten_vi_tri: string;

    @IsNotEmpty({ message: 'quốc gia không được bỏ trống!' })
    @ApiProperty()
    quoc_gia: string;

    @ApiProperty()
    hinh_anh?: string;
}