import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty({ message: 'mã phòng không được bỏ trống!' })
    @ApiProperty()
    ma_phong: number;

    @IsNotEmpty({ message: 'ngày bình luận không được bỏ trống!' })
    @ApiProperty()
    ngay_binh_luan: Date;

    @ApiProperty()
    noi_dung: string;

    @IsNotEmpty({ message: 'sao bình luận không được bỏ trống!' })
    @ApiProperty()
    sao_binh_luan: number;

    @ApiProperty()
    ma_nguoi_binh_luan: number;
}