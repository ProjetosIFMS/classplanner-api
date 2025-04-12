import { Logger, Module } from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { DisciplineController } from './discipline.controller';
import { CreateDisciplineRepository } from './repository/create-discipline.repository';
import { DeleteDisciplineRepository } from './repository/delete-discipline.repository';
import { UpdateDisciplineRepository } from './repository/update-discipline.repository';
import { FindAllDisciplinesRepository } from './repository/find-all-disciplines.repository';
import { FindDisciplineByIdRepository } from './repository/find-discipline-by-id.repository';
import { FindDisciplineByNameRepository } from './repository/find-discipline-by-name.repository';
import * as UseCases from './use-cases';
import { CourseModule } from '../course/course.module';
import { FindDisciplinesByCourseIdRepository } from './repository/find-disciplines-by-course-id.repository';
import { FindAllModalitiesRepository } from 'src/modules/modality/repository/find-all-modalities.repository';

const usecases = Object.values(UseCases);

@Module({
  controllers: [DisciplineController],
  imports: [CourseModule],
  providers: [
    CreateDisciplineRepository,
    DeleteDisciplineRepository,
    UpdateDisciplineRepository,
    FindAllDisciplinesRepository,
    FindDisciplineByIdRepository,
    FindDisciplineByNameRepository,
    FindDisciplinesByCourseIdRepository,
    FindAllModalitiesRepository,
    DisciplineService,
    ...usecases,
    Logger,
  ],
  exports: [
    CreateDisciplineRepository,
    DeleteDisciplineRepository,
    UpdateDisciplineRepository,
    FindAllDisciplinesRepository,
    FindDisciplineByIdRepository,
    FindDisciplineByNameRepository,
    FindDisciplinesByCourseIdRepository,
  ],
})
export class DisciplineModule {}
