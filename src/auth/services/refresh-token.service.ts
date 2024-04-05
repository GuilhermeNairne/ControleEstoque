import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';
import { AxiosResponse } from 'axios';

type IRefresh = {
  access_token: string;
  refresh_token: string;
};

@Injectable()
export class RefreshTokenService {
  constructor(private readonly httpService: HttpService) {}

  public async refresh(refresh: string): Promise<IRefresh> {
    try {
      const response: AxiosResponse<IRefresh> = await this.httpService
        .post<IRefresh>('/auth/refresh', { refresh_token: refresh })
        .toPromise();

      return response.data;
    } catch (error) {
      throw new Error('Failed to refresh tokens');
    }
  }
}
