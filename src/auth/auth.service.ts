import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateCredentials(username: string, password: string) {
    const isValid =
      username === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASS;

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { username };
  }

  login(user: { username: string }) {
    const payload = { sub: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
