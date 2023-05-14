import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto';
import { AuthGuard } from './guards';
import { Request as Req } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('sign-up')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto)
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto)
  }

  @UseGuards(AuthGuard)
  @Get('private')
  async profile(@Request() req: Req) {

    return req.user
  }
}
