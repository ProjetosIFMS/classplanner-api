import { Logger, Module } from '@nestjs/common';
import * as UseCases from './use-cases';
import { CreateClassgradeDisciplneRepository } from './repository/create-classgrade-discipline.repository';
import { DeleteClassgradeDisciplineRepository } from './repository/delete-classgrade-discipline.repository';
import { UpdateClassgradeDisciplineRepository } from './repository/update-classgrade-discipline.repository';
import { FindAllClassgradeDisciplinesRepository } from './repository/find-all-classgrade-disciplines.repository';
import { FindClassgradeDisciplineByIdRepository } from './repository/find-classgrade-discipline-by-id.repository';
import { ClassgradeDisciplineService } from './classgrade-discipline.service';
import { ClassgradeDisciplineController } from './classgrade-discipline.controller';
import { ClassgradeModule } from '../class-grade/classgrade.module';
import { DisciplineModule } from '../discipline/discipline.module';
import { ModalityModule } from '../modality/modality.module';
import { PeriodModule } from '../period/period.module';

const usecases = Object.values(UseCases);

@Module({
  controllers: [ClassgradeDisciplineController],
  imports: [ClassgradeModule, DisciplineModule, ModalityModule, PeriodModule],
  providers: [
    CreateClassgradeDisciplneRepository,
    DeleteClassgradeDisciplineRepository,
    UpdateClassgradeDisciplineRepository,
    FindAllClassgradeDisciplinesRepository,
    FindClassgradeDisciplineByIdRepository,
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
  ],
})
export class ClassgradeDisciplineModule {}
