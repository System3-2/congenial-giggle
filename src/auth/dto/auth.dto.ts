import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    description: 'Email',
    default: 'johndoe@mail.com',
    uniqueItems: true,
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User first name',
    default: 'John',
    required: true,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User first name',
    default: 'Doe',
    required: true,
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User Password',
    default: '/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$',
    required: true,
    pattern: '/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'Email',
    default: 'johndoe@mail.com',
    uniqueItems: true,
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User Password',
    default: '/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$',
    required: true,
    pattern: '/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$',
  })
  @IsString()
  password: string;
}
