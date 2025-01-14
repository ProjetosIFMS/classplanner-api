import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  generateJwt(user: any) {
    const payload = { username: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async validateGoogleAccessToken(accessToken: string): Promise<any> {
    const googleUserInfoUrl = process.env.GOOGLE_USERINFO_URL;

    try {
      const response = await axios.get(
        `${googleUserInfoUrl}?access_token=${accessToken}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error('Error validating Google access token', error);
      throw new UnauthorizedException('Invalid Google access token');
    }
  }

  async googleLogin(req, res) {
    if (!req.user) {
      return 'No user from google';
    }

    const payload = {
      username: req.user.email,
      sub: req.user.id,
    };

    const accessToken = this.jwtService.sign(payload);
    res.redirect(`${process.env.FRONTEND_CALLBACK_GOOGLE_URL}${accessToken}`);
  }
}
