import {
  BadRequestException,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private config: ConfigService,
    private profileService: ProfileService,
    private cloudinary: CloudinaryService,
  ) {}
  private readonly logger = new Logger(ProfileController.name);

  @Post('picture')
  @UseInterceptors(
    FileInterceptor('profile-picture', {
      limits: {
        files: 5, // Maximum 5 files
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          return cb(new Error('goes wrong on the mimetype!'), false);
        }
      },
    }),
  )
  async uploadProfilePicture(@UploadedFile() file: Express.Multer.File) {
    try {
      console.log(file);
      const uploadImage = await this.cloudinary.uploadImage(file);
      console.log(uploadImage);
      return 'done';
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid file');
    }
  }
}
