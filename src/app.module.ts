import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BookmarkModule } from './bookmark/bookmark.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    BookmarkModule,
    PrismaModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
  ],
  controllers: [],
  providers: [JwtService]
})

export class AppModule { }












