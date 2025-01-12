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

const usecases = Object.values(UseCases);

@Module({
  controllers: [DisciplineController],
  providers: [
    CreateDisciplineRepository,
    DeleteDisciplineRepository,
    UpdateDisciplineRepository,
    FindAllDisciplinesRepository,
    FindDisciplineByIdRepository,
    FindDisciplineByNameRepository,
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
  ],
})
export class DisciplineModule {}
