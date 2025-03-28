import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { RejectDayoffRepository } from 'src/modules/dayoff/repository/reject-dayoff.repository';
import { FindDayoffByIdRepository } from 'src/modules/dayoff/repository/find-dayoff-by-id.repository';

@Injectable()
export class RejectDayoffUseCase {
  constructor(
    private readonly rejectDayoffRepository: RejectDayoffRepository,
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

      const dayoff = await this.rejectDayoffRepository.rejectDayoff(id);
      this.logger.log('Dayoff rejected');
      return dayoff;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error while rejecting dayoff',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
