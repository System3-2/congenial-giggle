import { Body, Controller, Post, Logger, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  private logger = new Logger(AuthController.name);

  @Post('signup')
  signup(@Body() signDto: SignUpDto) {
    return this.authService.signup(signDto);
  }
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('verify/:token')
  verifyAccount(@Param('token') token: string) {
    return this.authService.verifyAccount(token);
  }

  @Get('delete')
  deleteMany() {
    return this.authService.delete();
  }
}
