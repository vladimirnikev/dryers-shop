import { IsString } from 'class-validator';

export class DeleteImageDto {
  @IsString()
  readonly imageUrl: string;
}
