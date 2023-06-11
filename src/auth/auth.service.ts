import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { SignUpDto, LoginDto } from './dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';

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
    const user = await this.prisma.user.create({
      data: {
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
        email: signUpDto.email,
        hash: signUpDto.password,
      },
    });

    // this.logger.debug(user);
    // this.sendConfirmationEmail(user.email, user.firstName, user.lastName);
    this.mailer.sendConfirmationEmail(
      user.email,
      user.firstName,
      user.lastName,
    );
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
    return user;
  }

  //PERF: generate jwt token for authentication
  signToken() {
    return 'token signed';
  }

  sendConfirmationEmail(
    email: string,
    firstName?: string,
    lastName?: string,
  ): void {
    this.mail
      .sendMail({
        to: 'olojam266@gmail.com',
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        html: `<h1>hi ${firstName} ${lastName}</h1>`,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
