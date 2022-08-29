import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCallDto {
  @IsPhoneNumber('UA')
  readonly phone: string;

  @IsString()
  @IsOptional()
  readonly time: string;
}
