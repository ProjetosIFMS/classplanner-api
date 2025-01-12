import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DisciplineModule } from './modules/discipline/discipline.module';
import { PivotModule } from './modules/pivot/pivot.module';

@Module({
  imports: [AuthModule, DisciplineModule, PivotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
