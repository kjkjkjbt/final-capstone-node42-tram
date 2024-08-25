import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { cleanObject } from 'src/helpers/clean-object';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
    prisma = new PrismaClient();

    async getCommentPagination(
        pageIndex: number,
        pageSize: number
    ): Promise<CommentDto[]> {
        try {
            const comments = await this.prisma.binh_luan.findMany({
                skip: (pageIndex - 1) * pageSize,
                take: pageSize
            });
            return comments;
        } catch (error) {
            throw new Error('Failed to get list comment');
        }
    }

    async createComment(createComment: CreateCommentDto): Promise<CommentDto> {
        try {
            const starComment = createComment.sao_binh_luan;
            if (starComment < 1 || starComment > 5) {
                throw new BadRequestException(`Failed to create comment: star of comment is wrong!`);
            }
            const result = await this.prisma.binh_luan.create({ data: createComment });
            const newComment = {
                ...result,
                id: result.id
            }
            return newComment;
        } catch (error) {
            throw new InternalServerErrorException(`Failed to create comment: ${error}`);
        }
    }

    async deleteCommentById(id: number): Promise<void> {
        try {
            const location = await this.prisma.binh_luan.findUnique({
                where: { id },
            });

            if (!location) {
                throw new NotFoundException('Comment not found');
            }

            await this.prisma.binh_luan.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to delete comment: ${error.message}`);
        }
    }

    async updateComment(id: number, updateCommentDto: UpdateCommentDto): Promise<CommentDto> {
        try {
            const comment = await this.prisma.binh_luan.findUnique({
                where: { id },
            });

            if (!comment) {
                throw new NotFoundException('Comment not found');
            }

            const starComment = updateCommentDto.sao_binh_luan;
            if (starComment < 1 || starComment > 5) {
                throw new BadRequestException(`Failed to update comment: star of comment is wrong!`);
            }

            const cleanedUpdateLocationDto = cleanObject(updateCommentDto);

            const updatedComment = await this.prisma.binh_luan.update({
                where: { id },
                data: cleanedUpdateLocationDto,
            });

            return updatedComment
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(`Failed to update comment: ${error.message}`);
        }
    }
}
