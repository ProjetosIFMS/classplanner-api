import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindSystemConfigRepository } from 'src/modules/system-config/repository/find-system-config.repository';

@Injectable()
export class FindSystemConfigUseCase {
  constructor(
    private readonly findSystemConfigRepository: FindSystemConfigRepository,
    private readonly logger: Logger,
  ) {}

  async execute() {
    try {
      const systemConfig =
        await this.findSystemConfigRepository.findSystemConfig();
      this.logger.log('Found system config', FindSystemConfigUseCase.name);
      return systemConfig;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding system config',
      });
      this.logger.error(error.message, FindSystemConfigUseCase.name);
      throw error;
    }
  }
}
