import { Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/register')
  signup() {
    return { success: true, message: 'Account created succesfully' }
  }

  @Post('/login')
  login() {
    return { success: true, message: 'Login successful' }
  }
}