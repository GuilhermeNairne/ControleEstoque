import { Injectable } from '@nestjs/common';
import { RefreshTokenService } from '../services/refresh-token.service';

@Injectable()
export class RefreshUseCase {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  public async execute(refreshToken: string) {
    const { access_token, refresh_token } =
      await this.refreshTokenService.refresh(refreshToken);

    const result = {
      access_token: access_token,
      refresh_token: refresh_token,
    };

    return result;
  }
}
