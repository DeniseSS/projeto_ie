import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginService } from '../login/login.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private loginService: LoginService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.loginService.validateCredentials({
      email,
      password: pass,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(email: string, pass: string) {
    const user = await this.loginService.create({
      email,
      password: pass,
    });
    if (!user) {
      throw new InternalServerErrorException();
    }
    delete user.password;
    return user;
  }
}
