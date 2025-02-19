import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllPeriodsRepository } from '../repository/find-all-periods.repository';

@Injectable()
export class FindAllPeriodsUseCase {
  constructor(
    private readonly findAllPeriodsRepository: FindAllPeriodsRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      const periods = await this.findAllPeriodsRepository.findAllPeriods();
      if (!periods) {
        throw new NotFoundException('No periods found');
      }
      this.logger.log('Periods found', FindAllPeriodsUseCase.name);
      return periods;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error deleting period',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
