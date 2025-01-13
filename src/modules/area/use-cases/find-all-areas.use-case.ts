import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllAreasRepository } from '../repository/find-all-area.repository';

@Injectable()
export class FindAllAreasUseCase {
  constructor(
    private readonly findAllAreasRepository: FindAllAreasRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      const areas = await this.findAllAreasRepository.findAllAreas();
      if (!areas) {
        throw new NotFoundException('No areas found');
      }
      this.logger.log('Areas found', FindAllAreasUseCase.name);
      return areas;
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
