import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }
  signup() {
    return { success: true, message: 'Account created succesfully' }
  }

  login() {
    return { success: true, message: 'Login successful' }
  }
}