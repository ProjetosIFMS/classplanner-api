import { Logger, Module } from '@nestjs/common';
import * as UseCases from './use-cases';
import { DeletePedagogicalProjectRepository } from './repository/delete-pedagogical-project.repository';
import { PedagogicalProjectController } from './pedagogical-project.controller';
import { CreatePedagogicalProjectRepository } from './repository/create-pedagogical-project.repository';
import { FindPedagogicalProjectByIdRepository } from './repository/find-pedagogical-project-by-id.repository';
import { PedagogicalProjectService } from './pedagogical-project.service';
import { FindAllPedagogicalProjectsRepository } from './repository/find-all-pedagogical-project.repository';
import { UpdatePedagogicalProjectRepository } from './repository/update-pedagogical-project.repository';

const usecases = Object.values(UseCases);

@Module({
  controllers: [PedagogicalProjectController],
  providers: [
    CreatePedagogicalProjectRepository,
    FindPedagogicalProjectByIdRepository,
    FindAllPedagogicalProjectsRepository,
    DeletePedagogicalProjectRepository,
    UpdatePedagogicalProjectRepository,
    PedagogicalProjectService,
    ...usecases,
    Logger,
  ],
})
export class PedagogicalProjectModule {}
