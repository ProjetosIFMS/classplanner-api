import { CreatePivotRepository } from './repository/create-pivot.repository';
import { Logger, Module } from '@nestjs/common';
import { PivotService } from './pivot.service';
import { PivotController } from './pivot.controller';
import * as UseCases from './use-cases';
import { FindAllPivotsRepository } from './repository/find-all-pivot.repository';
import { FindPivotByIdRepository } from './repository/find-pivot-by-id.repository';
import { DeletePivotRepository } from './repository/delete-pivot.repository';
import { UpdatePivotRepository } from './repository/update-pivot.repository';

const usecases = Object.values(UseCases);

@Module({
  controllers: [PivotController],
  providers: [
    CreatePivotRepository,
    FindAllPivotsRepository,
    FindPivotByIdRepository,
    DeletePivotRepository,
    UpdatePivotRepository,
    PivotService,
    ...usecases,
    Logger,
  ],
})
export class PivotModule {}
