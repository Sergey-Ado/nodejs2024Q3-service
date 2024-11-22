import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class RefreshDto {
  @IsString()
  @ValidateIf((_, value) => value !== undefined)
  refreshToken: string;
}
