import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('google')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    this.appService.generateJwt(req.user);
    const user = req.user;
    const accessToken = this.appService.generateJwt(user);
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?access_token=${accessToken}`,
    );
  }
}
