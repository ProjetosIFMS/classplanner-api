import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateSystemConfigRepository } from 'src/modules/system-config/repository/create-system-config.repository';

@Injectable()
export class CreateSystemConfigUseCase {
  constructor(
    private readonly createSystemConfigRepository: CreateSystemConfigRepository,
    private readonly logger: Logger,
  ) {}

  async execute() {
    try {
      const systemConfig =
        await this.createSystemConfigRepository.createSystemConfig();
      this.logger.log(
        'System config created (this should only happen on the first time the database is created)',
        CreateSystemConfigUseCase.name,
      );
      return systemConfig;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating system config',
      });
      this.logger.error(error.message, CreateSystemConfigUseCase.name);
      throw error;
    }
  }
}
