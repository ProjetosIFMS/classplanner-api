import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { config } from 'dotenv';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from '../../strategies/google.strategy';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../strategies/jwt.strategy';

config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
  exports: [],
})
export class AuthModule {}
