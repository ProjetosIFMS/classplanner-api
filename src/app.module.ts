import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DisciplineModule } from './modules/discipline/discipline.module';

@Module({
  imports: [AuthModule, DisciplineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
