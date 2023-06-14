import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
