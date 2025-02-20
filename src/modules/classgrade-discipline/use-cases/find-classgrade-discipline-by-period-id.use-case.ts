import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindClassgradeDisciplineByPeriodIdRepository } from '../repository/find-classgrade-discipline-by-period-id.repository';

@Injectable()
export class FindClassgradeDisciplineByPeriodIdUseCase {
  constructor(
    private readonly findClassgradeDisciplineByPeriodIdRepository: FindClassgradeDisciplineByPeriodIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(period_id: string) {
    try {
      const periodExists =
        await this.findClassgradeDisciplineByPeriodIdRepository.FindByPeriodId(
          period_id,
        );

      if (!periodExists) {
        const error = new NotFoundException('Period not found');
        this.logger.error(error.message);
        throw error;
      }
      this.logger.log('Discipline alocated to classgrade by period found');
      return periodExists;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description:
          'Error finding disciplines related to classgrade with period',
      });
    }
  }
}
