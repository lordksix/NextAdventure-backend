import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsRFC5321Email } from 'src/utils/email.validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @MaxLength(50, { message: 'Maximum length of 50 chars' })
  @IsRFC5321Email({ message: 'Invalid email addres' })
  email: string;

  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  @MaxLength(50, { message: 'Maximum length of 50 chars' })
  firstName: string;

  @IsNotEmpty({ message: 'last name is required' })
  @IsString({ message: 'Last name must be a string' })
  @MaxLength(50, { message: 'Maximum length of 50 chars' })
  lastName: string;
}
