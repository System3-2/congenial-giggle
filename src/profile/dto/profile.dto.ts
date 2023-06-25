import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ProfileDto {
  @ApiProperty({
    description: 'Email',
    default: 'johndoe@mail.com',
    uniqueItems: true,
    required: true,
  })
  @IsEmail()
  email: string;
}
