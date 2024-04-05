import { IsDefined, IsString, MinLength } from 'class-validator';

export class RefreshTokenDto {
  @IsDefined()
  @IsString()
  @MinLength(400)
  refresh_token: string;
}
