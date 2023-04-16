import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }
  async signup(dto: AuthDto) {
    // generate password hash
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          firstName: true,
          lastName: true
        }
      })
      return user;
    } catch (error) {
      // console.log(error)
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Credentials taken')
      }
      else {
        throw new ForbiddenException('Credentials taken')
      }
    }
  }

  login() {
    return { success: true, message: 'Login successful' }
  }
}