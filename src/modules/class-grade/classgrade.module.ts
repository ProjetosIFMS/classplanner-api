import { Logger, Module } from '@nestjs/common';
import { ClassgradeService } from './classgrade.service';
import { ClassgradeController } from './classgrade.controller';
import { CreateClassGradeRepository } from './repository/create-classgrade.repository';
import { UpdateClassGradeRepository } from './repository/update-classgrade.repository';
import { FindClassGradeByIdRepository } from './repository/find-classgrade-by-id.repository';
import { FindAllClassGradesRepository } from './repository/find-all-classgrades.repository';
import { DeleteClassGradeRepository } from './repository/delete-classgrade.repository';
import * as UseCases from './use-cases';

const usecases = Object.values(UseCases);

@Module({
  controllers: [ClassgradeController],
  providers: [
    ClassgradeService,
    CreateClassGradeRepository,
    UpdateClassGradeRepository,
    FindClassGradeByIdRepository,
    FindAllClassGradesRepository,
    DeleteClassGradeRepository,
    ...usecases,
    Logger,
  ],
  exports: [
    CreateClassGradeRepository,
    UpdateClassGradeRepository,
    FindClassGradeByIdRepository,
    FindAllClassGradesRepository,
    DeleteClassGradeRepository,
  ],
})
export class ClassgradeModule {}
