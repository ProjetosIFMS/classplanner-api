import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DisciplineModule } from './modules/discipline/discipline.module';
import { PedagogicalProjectModule } from './modules/pedagogical-project/pedagogical-project.module';
import { CourseModule } from './modules/course/course.module';
import { AreaModule } from './modules/area/area.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { ConditionalAuthGuard } from './guards/conditional-auth.guard';

@Module({
  imports: [
    AuthModule,
    DisciplineModule,
    PedagogicalProjectModule,
    AreaModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ConditionalAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
