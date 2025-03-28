import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ApproveDayoffRepository } from 'src/modules/dayoff/repository/approve-dayoff.repository';
import { FindDayoffByIdRepository } from 'src/modules/dayoff/repository/find-dayoff-by-id.repository';

@Injectable()
export class ApproveDayoffUseCase {
  constructor(
    private readonly approveDayoffRepository: ApproveDayoffRepository,
    private readonly findDayoffByIdRepository: FindDayoffByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const dayoffExists =
        await this.findDayoffByIdRepository.findDayoffById(id);
      if (!dayoffExists) {
        throw new NotFoundException('Dayoff not found');
      }

      const dayoff = await this.approveDayoffRepository.approveDayoff(id);
      this.logger.log('Dayoff approved');
      return dayoff;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error while approving dayoff',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
