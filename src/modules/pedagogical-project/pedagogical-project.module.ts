import { Logger, Module } from '@nestjs/common';
// import * as UseCases from './use-cases';
import { DeletePedagogicalProjectRepository } from './repository/delete-pedagogical-project.repository';
import { PedagogicalProjectController } from './pedagogical-project.controller';
import { CreatePedagogicalProjectRepository } from './repository/create-pedagogical-project.repository';
import { FindPedagogicalProjectByIdRepository } from './repository/find-pedagogical-project-by-id.repository';
import { UpdateAreaRepository } from '../area/repository/update-area.repository';
import { PedagogicalProjectService } from './pedagogical-project.service';

@Module({
  controllers: [PedagogicalProjectController],
  providers: [
    CreatePedagogicalProjectRepository,
    FindPedagogicalProjectByIdRepository,
    DeletePedagogicalProjectRepository,
    UpdateAreaRepository,
    PedagogicalProjectService,
    // ...usecases,
    Logger,
  ],
})
export class PedagogicalProjectModule {}
