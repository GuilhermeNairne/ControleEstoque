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

    return {
      access_token: await this.jwtService.signAsync(payload),
      usuario: user.usuario,
      funcao: user.funcao,
    };
  }
}
