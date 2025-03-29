import {
  Injectable,
  Logger,
  ServiceUnavailableException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteDayoffRepository } from 'src/modules/dayoff/repository/delete-dayoff.repository';
import { FindDayoffByIdRepository } from 'src/modules/dayoff/repository/find-dayoff-by-id.repository';

@Injectable()
export class DeleteDayoffUseCase {
  constructor(
    private readonly deleteDayoffRepository: DeleteDayoffRepository,
    private readonly findDayoffByIdRepository: FindDayoffByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string) {
    try {
      const dayoffExists =
        await this.findDayoffByIdRepository.findDayoffById(id);

      if (!dayoffExists) {
        throw new NotFoundException('Dayoff not found');
      }

      const dayoff =
        await this.deleteDayoffRepository.DeleteDayoffRepository(id);
      this.logger.log('Dayoff deleted');
      return dayoff;
    } catch (err) {
      if (err instanceof NotFoundException) {
        this.logger.error(err.message, DeleteDayoffUseCase.name);
        throw err;
      }

      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error deleting dayoff',
      });
      this.logger.error(error.message, DeleteDayoffUseCase.name);
      throw error;
    }
  }
}
