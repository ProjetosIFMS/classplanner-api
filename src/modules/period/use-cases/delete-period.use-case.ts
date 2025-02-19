import { FindPeriodByIdRepository } from './../repository/find-period-by-id.repository';
import { DeletePeriodRepository } from './../repository/delete-period.repository';
import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class DeletePeriodUseCase {
  constructor(
    private readonly deletePeriodRepository: DeletePeriodRepository,
    private readonly findPeriodByIdRepository: FindPeriodByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string) {
    try {
      const periodExists =
        await this.findPeriodByIdRepository.findPeriodById(id);

      if (!periodExists) {
        const error = new NotFoundException('Period not found');
        this.logger.error(error.message);
        throw error;
      }

      const period = await this.deletePeriodRepository.deletePeriod(id);
      this.logger.log('Period deleted', DeletePeriodUseCase.name);
      return period;
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
