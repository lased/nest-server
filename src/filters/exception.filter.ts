import { Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

export abstract class HttpExceptionResponse {
  status: number;
  message: string[];
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as { message: string[] };
    let message = [exception.message];

    if (exceptionResponse.message instanceof Array) {
      message = exceptionResponse.message || [];
    }

    const json: HttpExceptionResponse = { status, message };

    response.status(status).json(json);
  }
}
