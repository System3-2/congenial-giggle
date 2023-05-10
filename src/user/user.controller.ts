import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards';

@Controller('users')
export class UserController {

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return req.user
  }

}
