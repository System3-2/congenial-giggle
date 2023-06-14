import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants/constants';
import * as dotenv from 'dotenv';
dotenv.config();

export const CloudinaryProvider = {
  provide: 'cloudinary',
  useFactory: () => {
    return v2.config({
      api_secret: process.env.CLOUD_API_SECRET,
      api_key: process.env.CLOUD_API_KEY,
      cloud_name: process.env.CLOUD_NAME,
    });
  },
};
