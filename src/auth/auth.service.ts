import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) { }
  async signUp(dto: AuthDto) {

    const hash = await argon.hash(dto.password)

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash: hash
        }
      })
      return user
    } catch (error) {
      throw new ForbiddenException('Credentials taken')
    }

  }

  login(dto: AuthDto) {
    return 'Login successfull'
  }
}
