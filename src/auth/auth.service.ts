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

  async login(dto: AuthDto) {
    //Find user by email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (!user) throw new ForbiddenException('User does not exists')

    //const pwMatches = await argon.verify(user.hash, dto.password)
    const pwMatches = user.hash === dto.password

    if (!pwMatches) throw new ForbiddenException('Invalid Credentials')

    return user;
  }
}
