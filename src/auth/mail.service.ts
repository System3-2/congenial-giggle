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
  token: string;
};

@Injectable()
export class MailService {
  private logger = new Logger(MailerService.name);
  constructor(private config: ConfigService, private mail: MailerService) {}

  //PERF: Emit event for email
  @OnEvent(EvenTypes.EMAIL_CONFIRMATION)
  handleEmailConfirmation(payload: EventPayload) {
    this.logger.debug(payload);
    let from = `Jobster <noreply@nestjs.com>`;
    this.mail
      .sendMail({
        to: `${payload.email}`,
        from: from,
        subject: 'Account Verification ✔',
        template: '../templates/confirmationEmail.hbs',
        context: {
          name: `${payload.firstName}  ${payload.lastName}`,
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
