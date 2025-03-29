import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindDayoffByUserIdRepository } from 'src/modules/dayoff/repository/find-dayoff-by-user-id.repository';

@Injectable()
export class FindDayoffByUserIdUseCase {
  constructor(
    private readonly findDayoffByUserIdRepository: FindDayoffByUserIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(user_id: string) {
    try {
      const dayoff =
        await this.findDayoffByUserIdRepository.findDayoffByUserId(user_id);

      if (!dayoff) {
        throw new NotFoundException('Dayoff by user id not found');
      }

      return dayoff;
    } catch (err) {
      if (err instanceof NotFoundException) {
        this.logger.error(err.message, FindDayoffByUserIdUseCase.name);
        throw err;
      }

      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error while finding dayoff by user id',
      });
      this.logger.error(error.message, FindDayoffByUserIdUseCase.name);
      throw error;
    }
  }
}
