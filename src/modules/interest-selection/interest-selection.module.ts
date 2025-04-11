import { Logger, Module } from '@nestjs/common';
import { InterestSelectionService } from './interest-selection.service';
import { InterestSelectionController } from './interest-selection.controller';
import * as UseCases from './use-cases';
import * as Repositories from './repository';

const usecases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  controllers: [InterestSelectionController],
  providers: [InterestSelectionService, Logger, ...usecases, ...repositories],
  exports: [...repositories],
})
export class InterestSelectionModule {}
