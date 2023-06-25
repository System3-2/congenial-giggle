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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto, LoginDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  private logger = new Logger(AuthController.name);

  @ApiCreatedResponse({ description: 'User created' })
  @ApiBadRequestResponse({ description: 'Email already exist' })
  @Post('signup')
  signup(@Body() signDto: SignUpDto) {
    return this.authService.signup(signDto);
  }

  @ApiOkResponse({ description: 'User logged in' })
  @ApiNotFoundResponse({ description: 'User does not exist' })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOkResponse({ description: 'Account Verified' })
  @ApiNotFoundResponse({ description: 'User does not exists' })
  @ApiBadRequestResponse({ description: 'Account already verified' })
  @Get('verify/:token')
  verifyAccount(@Param('token') token: string) {
    this.logger.debug(token);
    return this.authService.verifyAccount(token);
    // return this.authService.verifyAccount(token);
  }

  @ApiOkResponse({ description: 'Account Verified' })
  @ApiNotFoundResponse({ description: 'User does not exists' })
  @ApiBadRequestResponse({ description: 'Expired token' })
  @Get('resendVerification')
  resendVerification(@Query('email') email: string) {
    this.logger.debug(email);
    if (!email) throw new BadRequestException('Email empty');
    return this.authService.resendVerification(email);
  }

  //TODO: implement password reset
  @ApiOkResponse({ description: 'Password recovery email sent' })
  @ApiNotFoundResponse({ description: 'User does not exists' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('password_recovery')
  passwordRecovery(@Query('email') email: string) {
    this.logger.debug(email);
    if (!email) throw new BadRequestException('Email empty');
    return this.authService.passwordRecovery(email);
  }
}
