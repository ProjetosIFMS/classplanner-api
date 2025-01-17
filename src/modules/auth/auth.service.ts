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
    const payload = {
      username: user.email,
      sub: user.id,
      role: user.role,
    };
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

  googleLogin(req) {
    if (!req.user) {
      return 'No user from Google';
    }

    const payload = {
      username: req.user.email,
      sub: req.user.id,
      role: req.user.role,
    };

    return {
      message: 'User information from Google',
      user: req.user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
