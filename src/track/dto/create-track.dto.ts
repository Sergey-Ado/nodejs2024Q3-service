import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  artistId: string;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  albumId: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
