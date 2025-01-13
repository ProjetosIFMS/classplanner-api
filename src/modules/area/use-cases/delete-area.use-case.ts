import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DeleteAreaRepository } from '../repository/delete-area.repository';
import { FindAreaByIdRepository } from '../repository/find-area-by-id.repository';

@Injectable()
export class DeleteAreaUseCase {
  constructor(
    private readonly deleteAreaRepository: DeleteAreaRepository,
    private readonly findAreaByIdRepository: FindAreaByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const areaExists = await this.findAreaByIdRepository.findAreaById(id);
      if (!areaExists) {
        const error = new NotFoundException('Area not found');
        this.logger.error(error.message);
        throw error;
      }

      const area = await this.deleteAreaRepository.deleteArea(id);
      this.logger.log('Area deleted', DeleteAreaUseCase.name);
      return area;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error deleting area',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
