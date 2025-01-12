import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { CreateUserRepository } from '../modules/user/repository/create-user.repository';
import { FindUserByEmailRepository } from '../modules/user/repository/find-user-by-email.repository';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const email = emails[0].value;
    let user = await this.findUserByEmailRepository.findUserByEmail(email);

    if (!user) {
      user = await this.createUserRepository.createUser({
        email,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        role: 'PROFESSOR',
        pivot_id: '',
      });
    }

    done(null, user);
  }
}
