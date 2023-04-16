import { Controller, Post, Req } from '@nestjs/common'
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/register')
  signUp(@Req() req: Request) {
    console.log(req.body)
    return this.authService.signup()
  }


  @Post('/login')
  login() {
    return this.authService.login()
  }

}