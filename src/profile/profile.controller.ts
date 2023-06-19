import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileService } from './profile.service';

type Body = {
  email: string;
};

@Controller('profile')
export class ProfileController {
  constructor(
    private config: ConfigService,
    private profileService: ProfileService,
    private cloudinary: CloudinaryService,
    private prisma: PrismaService,
  ) {}
  private readonly logger = new Logger(ProfileController.name);
  private expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  @Post('picture')
  @UseInterceptors(
    FileInterceptor('profile-picture', {
      limits: {
        files: 5, // Maximum 5 files
      },
      fileFilter: (_req, file, cb) => {
        const error = new BadRequestException('Invalid file');
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          return cb(error, false);
        }
      },
    }),
  )
  async uploadProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: Body,
  ) {
    const email = body.email;
    if (Object.keys(body).length === 0) {
      throw new BadRequestException('Email is empty');
    }
    if (!this.expression.test(email))
      throw new BadRequestException('Invalid email');
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new BadRequestException('User does not exist');

    try {
      console.log(file);
      const uploadImage = await this.cloudinary.uploadImage(file);
      this.logger.log(uploadImage);
      const profileImage = await this.prisma.user.update({
        where: { email },
        data: { profilePicture: uploadImage.secure_url },
      });
      return {
        message: 'Image uploaded',
        secure_url: uploadImage.secure_url,
        url: uploadImage.url,
        placeholder: uploadImage.placeholder,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message || 'Error');
    }
  }
}
