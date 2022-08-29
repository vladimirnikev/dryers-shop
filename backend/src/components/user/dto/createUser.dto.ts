import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;
  @MinLength(8)
  readonly password: string;
  @IsString()
  readonly username: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly surname: string;
  @IsString()
  readonly city: string;
  @IsPhoneNumber('UA')
  readonly phone: string;
}
