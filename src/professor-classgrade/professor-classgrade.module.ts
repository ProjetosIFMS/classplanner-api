import { Logger, Module } from '@nestjs/common';
import * as UseCases from './use-cases';
import { ProfessorClassgradeController } from './professor-classgrade.controller';
import { CreateProfessorClassGradeRepository } from './repository/create-professor-classgrade.repository';
import { UpdateProfessorClassgradeRepository } from './repository/update-professor-classgrade.repository';
import { DeleteProfessorClassgradeRepository } from './repository/delete-professor-classgrade.repository';
import { FindAllProfessorsClassgradesRepository } from './repository/find-all-professors-classgrades.repository';
import { FindProfessorClassgradeByIdRepository } from './repository/find-professor-classgrade-by-id.repository';
import { FindProfessorClassgradeByProfessorIdRepository } from './repository/find-professor-classgrade-by-professor-id.repository';
import { FindProfessorClassgradeByClassgradeIdRepository } from './repository/find-professor-classgrade-by-classgrade-id.repository';
import { ProfessorClassgradeService } from './professor-classgrade.service';

const usecases = Object.values(UseCases);

@Module({
  controllers: [ProfessorClassgradeController],
  providers: [
    CreateProfessorClassGradeRepository,
    UpdateProfessorClassgradeRepository,
    DeleteProfessorClassgradeRepository,
    FindAllProfessorsClassgradesRepository,
    FindProfessorClassgradeByIdRepository,
    FindProfessorClassgradeByProfessorIdRepository,
    FindProfessorClassgradeByClassgradeIdRepository,
    ProfessorClassgradeService,
    ...usecases,
    Logger,
  ],
  exports: [
    CreateProfessorClassGradeRepository,
    UpdateProfessorClassgradeRepository,
    DeleteProfessorClassgradeRepository,
    FindAllProfessorsClassgradesRepository,
    FindProfessorClassgradeByIdRepository,
    FindProfessorClassgradeByProfessorIdRepository,
    FindProfessorClassgradeByClassgradeIdRepository,
  ],
})
export class ProfessorClassgradeModule {}
