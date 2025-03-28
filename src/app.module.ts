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
import { PeriodModule } from './modules/period/period.module';
import { ModalityModule } from './modules/modality/modality.module';
import { ClassgradeModule } from './modules/class-grade/classgrade.module';
import { ClassgradeDisciplineModule } from './modules/classgrade-discipline/classgrade-discipline.module';
import { ProfessorClassgradeModule } from './modules/professor-classgrade/professor-classgrade.module';
import { UploadModule } from './shared/utils/uploads/uploads.module';
import { DayoffModule } from './modules/dayoff/dayoff.module';

@Module({
  imports: [
    AuthModule,
    DisciplineModule,
    PedagogicalProjectModule,
    AreaModule,
    CourseModule,
    PeriodModule,
    ModalityModule,
    ClassgradeModule,
    ClassgradeDisciplineModule,
    ProfessorClassgradeModule,
    UploadModule,
    DayoffModule,
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
