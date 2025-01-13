import { Logger, Module } from '@nestjs/common';
import * as UseCases from './use-cases';
import { CreateCourseRepository } from './repository/create-course.repository';
import { FindAllCoursesRepository } from './repository/find-all-course.repository';
import { FindCourseByIdRepository } from './repository/find-course-by-id.repository';
import { DeleteCourseRepository } from './repository/delete-course.repository';
import { UpdateCourseRepository } from './repository/update-course.repository';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';

const usecases = Object.values(UseCases);

@Module({
  controllers: [CourseController],
  providers: [
    CreateCourseRepository,
    FindAllCoursesRepository,
    FindCourseByIdRepository,
    DeleteCourseRepository,
    UpdateCourseRepository,
    CourseService,
    ...usecases,
    Logger,
  ],
})
export class CourseModule {}
