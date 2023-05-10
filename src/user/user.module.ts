import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/jwtConstants/jwtConstants';
import { AuthModule } from '../auth/auth.module'
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    AuthModule
  ],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [AuthService, UserService]
})
export class UserModule { }
