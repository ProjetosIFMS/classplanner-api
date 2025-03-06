import { Logger, Module } from '@nestjs/common';
import { ModalityService } from './modality.service';
import { ModalityController } from './modality.controller';
import { CreateModalityRepository } from './repository/create-modality.repository';
import { DeleteModalityRepository } from './repository/delete-modality.repository';
import { UpdateModalityRepository } from './repository/update-modality.repository';
import { FindAllModalitiesRepository } from './repository/find-all-modalities.repository';
import { FindModalityByIdRepository } from './repository/find-modality-by-id.repository';
import * as UseCases from './use-cases';
import { FindModalityByNameRepository } from './repository/find-modality-by-name.repository';

const usecases = Object.values(UseCases);

@Module({
  controllers: [ModalityController],
  providers: [
    ModalityService,
    CreateModalityRepository,
    DeleteModalityRepository,
    UpdateModalityRepository,
    FindAllModalitiesRepository,
    FindModalityByIdRepository,
    FindModalityByNameRepository,
    ModalityService,
    ...usecases,
    Logger,
  ],
  exports: [
    CreateModalityRepository,
    DeleteModalityRepository,
    UpdateModalityRepository,
    FindAllModalitiesRepository,
    FindModalityByIdRepository,
    FindModalityByNameRepository,
  ],
})
export class ModalityModule {}
