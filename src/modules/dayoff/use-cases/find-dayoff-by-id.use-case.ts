import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindDayoffByIdRepository } from 'src/modules/dayoff/repository/find-dayoff-by-id.repository';

@Injectable()
export class FindDayoffByIdUseCase {
  constructor(
    private readonly findDayoffByIdRepository: FindDayoffByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const dayoff = await this.findDayoffByIdRepository.findDayoffById(id);

      if (!dayoff) {
        const error = new NotFoundException('Dayoff not found');
        this.logger.error(error.message);
        throw error;
      }

      return dayoff;
    } catch (err) {
      if (err instanceof NotFoundException) {
        this.logger.error(err.message, FindDayoffByIdUseCase.name);
        throw err;
      }

      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error while finding dayoff by id',
      });
      this.logger.error(error.message, FindDayoffByIdUseCase.name);
      throw error;
    }
  }
}
