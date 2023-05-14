import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '../auth/guards';

@Controller('users')
export class UserController {
  constructor() { }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user
  }
}
