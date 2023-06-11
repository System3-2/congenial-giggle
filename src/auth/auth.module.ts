import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MailService } from './mail.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, MailService],
  controllers: [AuthController],
})
export class AuthModule {}
