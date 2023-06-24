import {
  Body,
  Controller,
  Post,
  Logger,
  Get,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
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
    this.logger.debug(token);
    return this.authService.verifyAccount(token);
    // return this.authService.verifyAccount(token);
  }

  @Get('resendVerification')
  resendVerification(@Query('email') email: string) {
    this.logger.debug(email);
    if (!email) throw new BadRequestException('Email empty');
    return this.authService.resendVerification(email);
  }

  //TODO: implement password reset
  @Post('password_recovery')
  passwordRecovery(@Query('email') email: string) {
    this.logger.debug(email);
    if (!email) throw new BadRequestException('Email empty');
    return this.authService.passwordRecovery(email);
  }
}
