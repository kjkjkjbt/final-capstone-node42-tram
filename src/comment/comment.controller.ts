import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from 'src/helpers/response';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags("Comment")
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiQuery({ name: 'pageIndex', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  @ApiOperation({ summary: 'Get list comment' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get list successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'internal server' })
  async locationPagination(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Res() res: Response
  ): Promise<Response<CommentDto[]>> {
    try {
      const page = pageIndex ? Number(pageIndex) : 1;
      const size = pageSize ? Number(pageSize) : 10;
      let comments = await this.commentService.getCommentPagination(page, size);

      return res.status(HttpStatus.OK).json(comments)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Comment created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async createRoom(
    @Body() createComment: CreateCommentDto,
    @Res() res: Response
  ): Promise<Response<CommentDto>> {
    try {
      const newRoom = await this.commentService.createComment(createComment);

      return res.status(HttpStatus.CREATED).json(newRoom);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bad Request', error: error.message });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Comment deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Comment not found' })
  async deleteRoomById(
    @Param('id') id: number,
    @Res() res: Response
  ): Promise<Response<void>> {
    try {
      const commentId = Number(id);
      await this.commentService.deleteCommentById(commentId);
      return sendSuccessResponse(res, null, 'Comment deleted successfully', HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return sendErrorResponse(res, error, HttpStatus.NOT_FOUND);
      }
      return sendErrorResponse(res, error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Comment updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Comment not found' })
  async updateRoom(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Res() res: Response
  ): Promise<Response<CommentDto>> {
    try {
      const roomId = Number(id);
      const roomUpdated = await this.commentService.updateComment(roomId, updateCommentDto);
      return sendSuccessResponse(res, roomUpdated, 'Comment updated successfully', HttpStatus.OK);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return sendErrorResponse(res, error, HttpStatus.NOT_FOUND);
      }
      return sendErrorResponse(res, error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
