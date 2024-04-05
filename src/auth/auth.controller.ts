import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RefreshTokenDto } from './dtos/refresh-token.dtos';
import { RefreshUseCase } from './use-case/refresh.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly refreshUseCase: RefreshUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.usuario, signInDto.senha);
  }

  @Post('/refresh')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  public async refresh(@Body() { refresh_token }: RefreshTokenDto) {
    const result = await this.refreshUseCase.execute(refresh_token);

    return result;
  }
}
