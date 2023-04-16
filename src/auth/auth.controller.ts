import { Body, Controller, ParseIntPipe, Post, Req } from '@nestjs/common'
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/register')
  signUp(@Body() dto: AuthDto) {
    console.log(dto)
    return this.authService.signup()
  }


  @Post('/login')
  login() {
    return this.authService.login()
  }

}