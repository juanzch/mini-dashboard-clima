import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    const user = this.authService.validateCredentials(
      body.username,
      body.password,
    );
    return this.authService.login(user);
  }
}
