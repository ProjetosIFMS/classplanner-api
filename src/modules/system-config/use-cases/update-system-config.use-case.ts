import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateSystemConfigDto } from 'src/modules/system-config/dto/update-system-config.dto';
import { UpdateSystemConfigRepository } from 'src/modules/system-config/repository/update-system-config.repository';

@Injectable()
export class UpdateSystemConfigUseCase {
  constructor(
    private readonly updateSystemConfigRepository: UpdateSystemConfigRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: UpdateSystemConfigDto, user_id: string) {
    try {
      const systemConfig =
        await this.updateSystemConfigRepository.updateSystemConfig(
          data,
          user_id,
        );
      this.logger.log('System config updated', UpdateSystemConfigUseCase.name);
      return systemConfig;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating system config',
      });
      this.logger.error(error.message, UpdateSystemConfigUseCase.name);
      throw error;
    }
  }
}
