import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateAreaRepository } from '../repository/update-area.repository';
import { FindAreaByIdRepository } from '../repository/find-area-by-id.repository';
import { UpdateAreaDto } from '../dto/update-area.dto';

@Injectable()
export class UpdateAreaUseCase {
  constructor(
    private readonly updateAreaRepository: UpdateAreaRepository,
    private readonly findAreaByIdRepository: FindAreaByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateAreaDto) {
    try {
      const areaExists = await this.findAreaByIdRepository.findAreaById(id);
      if (!areaExists) {
        const error = new NotFoundException('Area not found');
        this.logger.error(error.message);
        throw error;
      }
      const area = await this.updateAreaRepository.updateArea(id, data);
      this.logger.log('Area updated', UpdateAreaUseCase.name);
      return area;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error updating area',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
