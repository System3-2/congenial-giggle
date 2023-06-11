import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { SignUpDto, LoginDto } from './dto';
import { MailerService } from '@nestjs-modules/mailer';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private mail: MailerService,
    private event: EventEmitter2,
  ) {}

  //FIX: add bcrypt for password hashing
  async signup(signUpDto: SignUpDto) {
    const user = await this.prisma.user.create({
      data: {
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
        email: signUpDto.email,
        hash: signUpDto.password,
      },
    });

    // this.logger.debug(user);
    this.sendMail();
    return user;
  }
  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) throw new NotFoundException('User does not exist');

    //HACK: password hashing
    const pwMatches = user.hash === loginDto.password;

    if (!pwMatches) throw new ForbiddenException('Invalid credentials');

    // this.logger.debug(user);
    return this.sendMail();
    // return user;
  }

  //PERF: generate jwt token for authentication
  signToken() {
    return 'token signed';
  }

  //TODO: Render template
  sendMail(): void {
    this.mail
      .sendMail({
        to: 'olojam266@gmail.com',
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        html: '<h1>hi there</h1>',
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
