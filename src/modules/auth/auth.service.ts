import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwt(user: any) {
    const payload = { username: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const payload = {
      username: req.user.email,
      sub: req.user.id,
    };

    return {
      message: 'User information from google',
      user: req.user,
      acess_token: this.jwtService.sign(payload),
    };
  }
}
