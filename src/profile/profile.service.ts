import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  logger = new Logger(ProfileService.name);

  async uploadProfilePicture(profilePictureBuffer: Buffer, fileName: string) {
    // return '🌊';
  }
}
