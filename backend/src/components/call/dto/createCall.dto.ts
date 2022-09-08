import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCallDto {
  @IsPhoneNumber('UA')
  readonly phone: string;

  @IsString()
  readonly fullName: string;

  @IsString()
  @IsOptional()
  readonly message: string;
}
