import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreatePeriodDto } from '../dto/create-period.dto';
import { CreatePeriodRepository } from '../repository/create-period.repository';

@Injectable()
export class CreatePeriodUseCase {
  constructor(
    private readonly createPeriodRepository: CreatePeriodRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreatePeriodDto) {
    try {
      const period = await this.createPeriodRepository.createPeriod(data);
      this.logger.log('Period created', CreatePeriodUseCase.name);
      return period;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating period',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
