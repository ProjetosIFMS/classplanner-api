import { Logger, Module } from '@nestjs/common';
import * as UseCases from './use-cases';
import { CreateClassgradeDisciplneRepository } from './repository/create-classgrade-discipline.repository';
import { DeleteClassgradeDisciplineRepository } from './repository/delete-classgrade-discipline.repository';
import { UpdateClassgradeDisciplineRepository } from './repository/update-classgrade-discipline.repository';
import { FindAllClassgradeDisciplinesRepository } from './repository/find-all-classgrade-disciplines.repository';
import { FindClassgradeDisciplineByIdRepository } from './repository/find-classgrade-discipline-by-id.repository';
import { FindClassgradeDisciplineByClassGradeIdRepository } from './repository/find-classgrade-discipline-by-classgrade-id.repository';
import { FindClassgradeDisciplineByPeriodIdRepository } from './repository/find-classgrade-discipline-by-period-id.repository';
import { ClassgradeDisciplineService } from './classgrade-discipline.service';
import { ClassgradeDisciplineController } from './classgrade-discipline.controller';

const usecases = Object.values(UseCases);

@Module({
  controllers: [ClassgradeDisciplineController],
  providers: [
    CreateClassgradeDisciplneRepository,
    DeleteClassgradeDisciplineRepository,
    UpdateClassgradeDisciplineRepository,
    FindAllClassgradeDisciplinesRepository,
    FindClassgradeDisciplineByIdRepository,
    FindClassgradeDisciplineByClassGradeIdRepository,
    FindClassgradeDisciplineByPeriodIdRepository,
    ClassgradeDisciplineService,
    ...usecases,
    Logger,
  ],
  exports: [
    CreateClassgradeDisciplneRepository,
    DeleteClassgradeDisciplineRepository,
    UpdateClassgradeDisciplineRepository,
    FindAllClassgradeDisciplinesRepository,
    FindClassgradeDisciplineByIdRepository,
    FindClassgradeDisciplineByClassGradeIdRepository,
    FindClassgradeDisciplineByPeriodIdRepository,
  ],
})
export class ClassgradeDisciplineModule {}
