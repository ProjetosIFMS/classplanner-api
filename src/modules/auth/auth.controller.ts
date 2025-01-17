import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/public.decorator';

@ApiTags('Auth')
@Controller('google')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('redirect')
  @Public()
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
