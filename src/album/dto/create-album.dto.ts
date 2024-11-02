import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @ValidateIf((_, value) => value != null)
  artistId: string;
}
