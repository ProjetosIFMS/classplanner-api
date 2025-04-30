import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CountSystemConfigRepository } from 'src/modules/system-config/repository/count-system-config.repository';
import { CreateSystemConfigRepository } from 'src/modules/system-config/repository/create-system-config.repository';
import { KeepRecentSystemConfigRepository } from 'src/modules/system-config/repository/keep-recent-system-config.repository';

@Injectable()
export class VerifySystemConfigUseCase {
  constructor(
    private readonly createSystemConfigRepository: CreateSystemConfigRepository,
    private readonly countSystemConfigRepository: CountSystemConfigRepository,
    private readonly keepRecentSystemConfigRepository: KeepRecentSystemConfigRepository,
    private readonly logger: Logger,
  ) {}

  async execute() {
    try {
      const systemConfigCount =
        await this.countSystemConfigRepository.countSystemConfig();

      if (systemConfigCount > 1) {
        this.logger.error(
          'There are more than one system config, keeping the most recent one. This should not happen, verify your system config logic.',
          VerifySystemConfigUseCase.name,
        );
        await this.keepRecentSystemConfigRepository.KeepRecentSystemConfig();
      }

      if (systemConfigCount === 0) {
        this.logger.log(
          'No system config found, creating a new one',
          VerifySystemConfigUseCase.name,
        );
        const systemConfig =
          await this.createSystemConfigRepository.createSystemConfig();
        this.logger.log(
          'System config created (this should only happen on the first time the database is created)',
          VerifySystemConfigUseCase.name,
        );
        return systemConfig;
      }
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating system config',
      });
      this.logger.error(error.message, VerifySystemConfigUseCase.name);
      throw error;
    }
  }
}
