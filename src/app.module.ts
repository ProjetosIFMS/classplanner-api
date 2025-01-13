import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DisciplineModule } from './modules/discipline/discipline.module';
import { AreaModule } from './modules/area/area.module';

@Module({
  imports: [AuthModule, DisciplineModule, AreaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
