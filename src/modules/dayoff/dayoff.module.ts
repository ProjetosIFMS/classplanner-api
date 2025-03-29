import { Module, Logger } from '@nestjs/common';
import { DayoffService } from './dayoff.service';
import { DayoffController } from './dayoff.controller';
import * as UseCases from './use-cases';
import { CreateDayoffRepository } from 'src/modules/dayoff/repository/create-dayoff.repository';
import { DeleteDayoffRepository } from 'src/modules/dayoff/repository/delete-dayoff.repository';
import { FindAllDayoffsRepository } from 'src/modules/dayoff/repository/find-all-dayoffs.repository';
import { FindDayoffByIdRepository } from 'src/modules/dayoff/repository/find-dayoff-by-id.repository';
import { FindDayoffByUserIdRepository } from 'src/modules/dayoff/repository/find-dayoff-by-user-id.repository';
import { UpdateDayoffRepository } from 'src/modules/dayoff/repository/update-dayoff.repository';
import { ApproveDayoffRepository } from 'src/modules/dayoff/repository/approve-dayoff.repository';
import { RejectDayoffRepository } from 'src/modules/dayoff/repository/reject-dayoff.repository';

const usecases = Object.values(UseCases);

@Module({
  controllers: [DayoffController],
  providers: [
    DayoffService,
    CreateDayoffRepository,
    DeleteDayoffRepository,
    FindAllDayoffsRepository,
    FindDayoffByIdRepository,
    FindDayoffByUserIdRepository,
    UpdateDayoffRepository,
    ApproveDayoffRepository,
    RejectDayoffRepository,
    ...usecases,
    Logger,
  ],
  exports: [FindDayoffByIdRepository, FindAllDayoffsRepository],
})
export class DayoffModule {}
