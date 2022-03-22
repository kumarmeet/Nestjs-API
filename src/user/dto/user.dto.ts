import { IsEmail, IsNotEmpty, Min } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEmail()
  confirmEmail: string;

  @IsNotEmpty()
  @Min(6)
  password: string;
}
