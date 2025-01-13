import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DisciplineModule } from './modules/discipline/discipline.module';
import { PedagogicalProjectModule } from './modules/pedagogical-project/pedagogical-project.module';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [
    AuthModule,
    DisciplineModule,
    PedagogicalProjectModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
