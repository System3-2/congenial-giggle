import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private logger = new Logger(MailerService.name);
  constructor(private config: ConfigService, private mail: MailerService) {}

  //TODO: Render template
  async sendConfirmationEmail(
    email: string,
    firstName?: string,
    lastName?: string,
  ) {
    this.logger.log(email, firstName, lastName);
    this.logger.debug(this.config);
    this.logger.debug(this.mail);
    this.mail
      .sendMail({
        to: email,
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
