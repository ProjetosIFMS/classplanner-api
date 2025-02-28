import { CreatePeriodRepository } from './repository/create-period.repository';
import { Logger, Module } from '@nestjs/common';
import { PeriodService } from './period.service';
import { PeriodController } from './period.controller';
import * as UseCases from './use-cases';
import { FindAllPeriodsRepository } from './repository/find-all-periods.repository';
import { FindPeriodByIdRepository } from './repository/find-period-by-id.repository';
import { DeletePeriodRepository } from './repository/delete-period.repository';
import { UpdatePeriodRepository } from './repository/update-period.repository';

const usecases = Object.values(UseCases);

@Module({
  controllers: [PeriodController],
  providers: [
    CreatePeriodRepository,
    FindAllPeriodsRepository,
    FindPeriodByIdRepository,
    DeletePeriodRepository,
    UpdatePeriodRepository,
    PeriodService,
    ...usecases,
    Logger,
  ],
  exports: [
    CreatePeriodRepository,
    FindAllPeriodsRepository,
    FindPeriodByIdRepository,
    DeletePeriodRepository,
    UpdatePeriodRepository,
  ],
})
export class PeriodModule {}
