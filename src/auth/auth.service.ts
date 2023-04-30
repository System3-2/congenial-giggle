import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwt: JwtService, private config: ConfigService) { }
  async signUp(dto: AuthDto) {

    const hash = await argon.hash(dto.password)

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash: hash
        }
      })
      return this.signToken(user.id, user.email, 'Signup Successful')
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) throw new ForbiddenException('Account already exists ')
      else {
        throw new ForbiddenException('Credentials taken')
      }
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
    const pwMatches = await argon.verify(user.hash, dto.password)
    console.log(pwMatches)

    if (!pwMatches) throw new ForbiddenException('Invalid Credentials')

    return this.signToken(user.id, user.email, 'Login Successful')

  }

  async signToken(userId: number, email: string, message: string): Promise<{ access_token: string, email: string, message: string }> {
    const payload = {
      sub: userId,
      email
    }


    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15',
      secret: this.config.get('JWT_SECRET')
    })
    return {
      access_token: token,
      email,
      message
    }
  }
}
