import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DeleteDayoffRepository } from 'src/modules/dayoff/repository/delete-dayoff.repository';
import { FindDayoffByUserIdRepository } from 'src/modules/dayoff/repository/find-dayoff-by-user-id.repository';

@Injectable()
export class DeleteMyDayoffUseCase {
  constructor(
    private readonly findDayoffByUserIdRepository: FindDayoffByUserIdRepository,
    private readonly deleteDayoffRepository: DeleteDayoffRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(user_id: string) {
    try {
      const dayoffExists =
        await this.findDayoffByUserIdRepository.findDayoffByUserId(user_id);

      if (!dayoffExists) {
        throw new NotFoundException('Dayoff not found');
      }

      return await this.deleteDayoffRepository.DeleteDayoffRepository(
        dayoffExists.id,
      );
    } catch (err) {
      if (err instanceof NotFoundException) {
        this.logger.error(err.message, DeleteMyDayoffUseCase.name);
        throw err;
      }

      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error while deleting my dayoff',
      });
      this.logger.error(error.message, DeleteMyDayoffUseCase.name);
      throw error;
    }
  }
}
