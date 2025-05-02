import { Logger, Module } from '@nestjs/common';
import { SystemConfigService } from './system-config.service';
import { SystemConfigController } from './system-config.controller';
import { CountSystemConfigRepository } from 'src/modules/system-config/repository/count-system-config.repository';
import { CreateSystemConfigRepository } from 'src/modules/system-config/repository/create-system-config.repository';
import { FindSystemConfigRepository } from 'src/modules/system-config/repository/find-system-config.repository';
import { KeepRecentSystemConfigRepository } from 'src/modules/system-config/repository/keep-recent-system-config.repository';
import { UpdateSystemConfigRepository } from 'src/modules/system-config/repository/update-system-config.repository';
import * as UseCases from './use-cases';

const usecases = Object.values(UseCases);

@Module({
  imports: [],
  controllers: [SystemConfigController],
  providers: [
    SystemConfigService,
    CountSystemConfigRepository,
    CreateSystemConfigRepository,
    FindSystemConfigRepository,
    KeepRecentSystemConfigRepository,
    UpdateSystemConfigRepository,
    ...usecases,
    Logger,
  ],
  exports: [SystemConfigService],
})
export class SystemConfigModule {}
