import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './authservice.service';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.authService.login(user);
  }

  @Post('signup')
  async signup(
    @Body()
    body: {
      email: string;
      password: string;
      Role: 'PARTNER' | 'HOST';
    },
  ): Promise<{ access_token: string; user: User }> {
    try {
      return await this.authService.createUser(body);
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de l'inscription : ${error.message}`,
      );
    }
  }
}
