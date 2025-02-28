import { Logger, Module } from '@nestjs/common';
import * as UseCases from './use-cases';
import { ProfessorClassgradeController } from './professor-classgrade.controller';
import { CreateProfessorClassGradeRepository } from './repository/create-professor-classgrade.repository';
import { UpdateProfessorClassgradeRepository } from './repository/update-professor-classgrade.repository';
import { DeleteProfessorClassgradeRepository } from './repository/delete-professor-classgrade.repository';
import { FindAllProfessorsClassgradesRepository } from './repository/find-all-professors-classgrades.repository';
import { FindProfessorClassgradeByIdRepository } from './repository/find-professor-classgrade-by-id.repository';
import { ProfessorClassgradeService } from './professor-classgrade.service';
import { ClassgradeModule } from '../class-grade/classgrade.module';
import { UserModule } from '../user/user.module';

const usecases = Object.values(UseCases);

@Module({
  controllers: [ProfessorClassgradeController],
  imports: [ClassgradeModule, UserModule],
  providers: [
    CreateProfessorClassGradeRepository,
    UpdateProfessorClassgradeRepository,
    DeleteProfessorClassgradeRepository,
    FindAllProfessorsClassgradesRepository,
    FindProfessorClassgradeByIdRepository,
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
  ],
})
export class ProfessorClassgradeModule {}
