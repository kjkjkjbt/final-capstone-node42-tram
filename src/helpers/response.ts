import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

export const sendSuccessResponse = (res: Response, data: any, message?: string, statusCode: number = HttpStatus.OK) => {
  return res.status(statusCode).json({
    statusCode,
    message: message || 'Success',
    data,
  });
}

export const sendErrorResponse = (res: Response, error: any, statusCode: number = HttpStatus.BAD_REQUEST) => {
  return res.status(statusCode).json({
    statusCode,
    message: error.message,
  });
}