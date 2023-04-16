import { Body, Controller, ParseIntPipe, Post, Req } from '@nestjs/common'
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/register')
  signUp(@Body() dto: AuthDto) {

    return this.authService.signup(dto)
  }


  @Post('/login')
  login() {
    return this.authService.login()
  }

}