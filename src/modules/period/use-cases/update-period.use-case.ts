import { UpdatePeriodInput } from '../inputs/update-period.input';
import { FindPeriodByIdRepository } from './../repository/find-period-by-id.repository';
import { UpdatePeriodRepository } from './../repository/update-period.repository';
import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class UpdatePeriodUseCase {
  constructor(
    private readonly updatePeriodRepository: UpdatePeriodRepository,
    private readonly findPeriodByIdRepository: FindPeriodByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, data: UpdatePeriodInput) {
    try {
      const periodExists =
        await this.findPeriodByIdRepository.findPeriodById(id);
      if (!periodExists) {
        const error = new NotFoundException('Period not found');
        this.logger.error(error.message);
        throw error;
      }
      const period = await this.updatePeriodRepository.updatePeriod(id, data);
      this.logger.log('Period updated', UpdatePeriodUseCase.name);
      return period;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error updating period',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
