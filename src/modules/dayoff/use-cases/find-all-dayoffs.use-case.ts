import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DAYOFF_STATUS } from 'src/modules/dayoff/dto/dayoff-status';
import { WEEKDAY } from 'src/modules/dayoff/dto/weekday';
import { FindAllDayoffsRepository } from 'src/modules/dayoff/repository/find-all-dayoffs.repository';

@Injectable()
export class FindAllDayoffsUseCase {
  constructor(
    private readonly findAllDayoffsRepository: FindAllDayoffsRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(status: DAYOFF_STATUS | '', weekday: WEEKDAY | '') {
    try {
      return await this.findAllDayoffsRepository.findAllDayoffs(
        status,
        weekday,
      );
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding all dayoffs',
      });
      this.logger.error(error.message, FindAllDayoffsUseCase.name);
      throw error;
    }
  }
}
