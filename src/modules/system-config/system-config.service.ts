import { Injectable, OnModuleInit } from '@nestjs/common';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';
import {
  FindSystemConfigUseCase,
  UpdateSystemConfigUseCase,
  VerifySystemConfigUseCase,
} from './use-cases';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DISCIPLINE_SELECTION_MODE } from '@prisma/client';
import { Logger } from '@nestjs/common';

@Injectable()
export class SystemConfigService implements OnModuleInit {
  constructor(
    private readonly findSystemConfigUseCase: FindSystemConfigUseCase,
    private readonly updateSystemConfigUseCase: UpdateSystemConfigUseCase,
    private readonly verifySystemConfigUseCase: VerifySystemConfigUseCase,
    private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    await this.verifySystemConfigUseCase.execute();
  }

  async findSystemConfig() {
    return await this.findSystemConfigUseCase.execute();
  }

  async updateSystemConfig(data: UpdateSystemConfigDto, user_id: string) {
    return await this.updateSystemConfigUseCase.execute(data, user_id);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkExpiredModes() {
    this.logger.log('Checking expired modes...');
    const config = await this.findSystemConfigUseCase.execute();

    if (
      config.discipline_selection_mode_expires_at &&
      new Date() >= new Date(config.discipline_selection_mode_expires_at)
    ) {
      await this.updateSystemConfigUseCase.execute(
        {
          discipline_selection_mode: DISCIPLINE_SELECTION_MODE.NONE,
          discipline_selection_mode_expires_at: null,
        },
        config.updated_by || null,
      );
    }
  }
}
