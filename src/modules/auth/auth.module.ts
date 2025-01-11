import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { config } from 'dotenv';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from '../../strategies/google.strategy';
import { UserModule } from '../user/user.module';

config();

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports: [],
})
export class AuthModule {}
