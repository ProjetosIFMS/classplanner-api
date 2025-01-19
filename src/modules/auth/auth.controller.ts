import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/public.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

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
  googleAuthRedirect(@Req() req, @Res() res) {
    this.authService.generateJwt(req.user);
    const user = req.user;
    const accessToken = this.authService.generateJwt(user);
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?access_token=${accessToken}`,
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return {
      sub: req.user.sub,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      role: req.user.role,
      picture: req.user.picture,
    };
  }
}
