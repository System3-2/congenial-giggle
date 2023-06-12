import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
import { SignUpDto, LoginDto } from './dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
//HACK: Event types
import { EvenTypes } from 'src/Events/event-types';
import * as argon from 'argon2';

//NOTE: Hashing characters
const characters =
  'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private event: EventEmitter2,
    private mail: MailerService,
    private mailer: MailService,
  ) {}

  //FIX: add bcrypt for password hashing
  async signup(signUpDto: SignUpDto) {
    const hash = await argon.hash(signUpDto.password);
    const token = this.generateToken(45);
    const link = `http://localhost:8080:/auth/verify/${token}`;

    try {
      const user = await this.prisma.user.create({
        data: {
          firstName: signUpDto.firstName,
          lastName: signUpDto.lastName,
          email: signUpDto.email,
          hash: hash,
          emailToken: token,
        },
      });
      //TODO: check for prisma error

      this.event.emit(EvenTypes.EMAIL_CONFIRMATION, {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        link,
        token,
      });
      return token;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          this.logger.error(error.message);
          throw new BadRequestException('Email already exist');
        }
      } else {
        throw new BadRequestException('An error occurred on the server');
      }
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) throw new NotFoundException('User does not exist');

    //HACK: password hashing
    const pwMatches = argon.verify(user.hash, loginDto.password);
    if (!pwMatches) throw new ForbiddenException('Invalid credentials');

    // this.logger.debug(user);
    return user;
  }

  //PERF: generate jwt token for authentication
  signToken() {
    return 'token signed';
  }

  async verifyAccount(token: string) {
    this.logger.debug(token);
    try {
      const user = this.prisma.user.findFirst({
        where: {
          emailToken: token,
        },
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      });
      this.logger.debug(user);
    } catch (error) {}
  }

  //PERF: delete records
  async delete() {
    const data = await this.prisma.user.deleteMany();
    this.logger.debug(data);
    return 'database user model cleared';
  }

  generateToken(length: number): string {
    let token = '';
    for (let i = 0; i < length; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.logger.verbose(token);
    return token;
  }
}
