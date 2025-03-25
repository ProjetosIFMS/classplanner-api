import { Logger, Module } from '@nestjs/common';
import * as UseCases from './use-cases';
import { CreateAreaRepository } from './repository/create-area.repository';
import { FindAllAreasRepository } from './repository/find-all-area.repository';
import { FindAreaByIdRepository } from './repository/find-area-by-id.repository';
import { DeleteAreaRepository } from './repository/delete-area.repository';
import { UpdateAreaRepository } from './repository/update-area.repository';
import { FindAllProfessorsFromAreaByIdRepository } from 'src/modules/area/repository/find-all-professors-from-area-by-id.repository';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';

const usecases = Object.values(UseCases);

@Module({
  controllers: [AreaController],
  providers: [
    CreateAreaRepository,
    FindAllAreasRepository,
    FindAreaByIdRepository,
    DeleteAreaRepository,
    UpdateAreaRepository,
    FindAllProfessorsFromAreaByIdRepository,
    AreaService,
    ...usecases,
    Logger,
  ],
})
export class AreaModule {}
