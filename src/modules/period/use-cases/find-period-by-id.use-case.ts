import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindPeriodByIdRepository } from '../repository/find-period-by-id.repository';

@Injectable()
export class FindPeriodByIdUseCase {
  constructor(
    private readonly findPeriodByIdRepository: FindPeriodByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string) {
    try {
      const period = await this.findPeriodByIdRepository.findPeriodById(id);

      if (!period) {
        throw new NotFoundException('Period not found');
      }

      this.logger.log('Period found', FindPeriodByIdUseCase.name);
      return period;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error find period',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
