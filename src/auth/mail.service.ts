import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
//HACK: Event types
import { EvenTypes } from 'src/Events/event-types';

interface Payload {
  email: string;
  firstName: string;
  lastName: string;
}

interface EventPayload extends Payload {
  token: string;
}

interface VerifiedPayload extends Payload {}

@Injectable()
export class MailService {
  private logger = new Logger(MailerService.name);
  constructor(private config: ConfigService, private mail: MailerService) {}

  //PERF: Emit event for email
  @OnEvent(EvenTypes.EMAIL_CONFIRMATION)
  handleEmailConfirmation(payload: EventPayload) {
    const host = this.config.get('HOST');
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
          host,
        },
      })
      .then((success) => {
        this.logger.verbose(success);
      })
      .catch((err) => {
        this.logger.verbose(err);
      });
  }

  @OnEvent(EvenTypes.ACCOUNT_VERIFIED)
  handleAccountVerification(payload: VerifiedPayload) {
    this.logger.debug(payload);
    let from = `Jobster <noreply@nestjs.com>`;
    this.mail
      .sendMail({
        to: `${payload.email}`,
        from: from,
        subject: `Welcome onboard ${payload.firstName} ${payload.lastName} ✔`,
        template: '../templates/accountVerification.hbs',
        context: {
          name: `${payload.firstName}  ${payload.lastName}`,
        },
      })
      .then((success) => {
        this.logger.verbose(success);
        this.logger.verbose(`Email sent to alert on account verify`);
      })
      .catch((err) => {
        this.logger.verbose(err);
      });
  }

  @OnEvent(EvenTypes.PASSWORD_RECOVERY)
  handlePasswordRecovery(payload: EventPayload) {
    this.logger.debug(payload);
    const host = this.config.get('HOST');
    let from = `Jobster <noreply@nestjs.com>`;
    this.mail
      .sendMail({
        to: `${payload.email}`,
        from: from,
        subject: 'Account Verification ✔',
        template: '../templates/passwordRecovery.hbs',
        context: {
          name: `${payload.firstName}  ${payload.lastName}`,
          token: payload.token,
          host,
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
