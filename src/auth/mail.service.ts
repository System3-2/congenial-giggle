import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
//HACK: Event types
import { EvenTypes } from 'src/Events/event-types';

type EventPayload = {
  email: string;
  firstName: string;
  lastName: string;
  link: string;
  token: string;
};

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
        html: `<h1>Hello ${firstName} ${lastName}</h1>`,
        // template: '/templates/emailConfirmation',
        // context: {
        //   name: firstName + lastName,
        // },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //PERF: Emit event for email
  @OnEvent(EvenTypes.EMAIL_CONFIRMATION)
  handleEmailConfirmation(payload: EventPayload) {
    this.logger.debug(payload);
    this.mail
      .sendMail({
        to: `${payload.email}`,
        from: 'noreply@nestjs.com',
        subject: 'Account Verification ✔',
        template: '../templates/confirmationEmail.hbs',
        context: {
          name: `${payload.firstName}  ${payload.lastName}`,
          link: payload.link,
          token: payload.token,
        },
      })
      .then((success) => {
        this.logger.verbose(success);
      })
      .catch((err) => {
        this.logger.verbose(err);
      });
  }
}
