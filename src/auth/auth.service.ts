import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(usuario: string, senha: string): Promise<any> {
    const user = await this.usersService.findOne(usuario);

    const isMath = await bcrypt.compare(senha, user.senha);

    if (!isMath) throw new UnauthorizedException();

    const payload = { sub: user._id, userMail: user.usuario };
    const refreshPayload = { sub: user._id, type: 'refresh' };

    const refresh_token = this.jwtService.sign(refreshPayload, {
      expiresIn: '2d',
    });

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
      refresh_token: refresh_token,
      usuario: user.usuario,
      funcao: user.funcao,
      email: user.email,
      urlImage: user.urlImage,
      _id: user._id,
    };
  }
}
