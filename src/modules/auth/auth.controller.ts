import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      loginDto,
    );

    this.setCookie(response, refreshToken);

    return { accessToken };
  }

  @Get('refresh')
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    response.clearCookie('refreshToken', {
      httpOnly: true,
      // sameSite: 'none',
      // secure: true,
    });

    const { accessToken, refreshToken } = await this.authService.refresh(
      request.cookies?.refreshToken,
    );

    this.setCookie(response, refreshToken);

    return { accessToken };
  }

  private setCookie(response: Response, refreshToken: string) {
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      // sameSite: 'none',
      // secure: true,
      maxAge: 60 * 1000,
    });
  }
}
