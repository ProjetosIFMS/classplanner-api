import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DisciplineModule } from './modules/discipline/discipline.module';
import { PedagogicalProjectModule } from './modules/pedagogical-project/pedagogical-project.module';
import { CourseModule } from './modules/course/course.module';
import { AreaModule } from './modules/area/area.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { ConditionalAuthGuard } from './guards/conditional-auth.guard';
import { PeriodModule } from './modules/period/period.module';
import { ModalityModule } from './modules/modality/modality.module';
import { ClassgradeModule } from './modules/class-grade/classgrade.module';
import { ClassgradeDisciplineModule } from './modules/classgrade-discipline/classgrade-discipline.module';
import { ProfessorClassgradeModule } from './modules/professor-classgrade/professor-classgrade.module';
import { UploadModule } from './shared/utils/uploads/uploads.module';
import { DayoffModule } from './modules/dayoff/dayoff.module';
import { AuditLogInterceptor } from 'src/modules/audit-log/audit-log.interceptor';
import { AuditLogModule } from 'src/modules/audit-log/audit-log.module';
import { InterestSelectionModule } from './modules/interest-selection/interest-selection.module';
import { SystemConfigModule } from './modules/system-config/system-config.module';
import { ScheduleModule } from '@nestjs/schedule';

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
    AuditLogModule,
    InterestSelectionModule,
    SystemConfigModule,
    ScheduleModule.forRoot(),
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
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogInterceptor,
    },
  ],
})
export class AppModule {}
