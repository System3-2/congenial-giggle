import { Injectable, BadRequestException } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (file.size > 1000000) {
      throw new BadRequestException(
        'Please upload a file size not more than 1M',
      );
    }
    // Check if the file is an image
    if (!file.mimetype.startsWith('image')) {
      throw new BadRequestException(
        'Sorry, this file is not an image, please try again',
      );
    }
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'profile_picture' },
        (error, result) => {
          if (error) return error.message;
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}
