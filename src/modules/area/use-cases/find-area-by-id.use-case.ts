import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAreaByIdRepository } from '../repository/find-area-by-id.repository';

@Injectable()
export class FindAreaByIdUseCase {
  constructor(
    private readonly findAreaByIdRepository: FindAreaByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const area = await this.findAreaByIdRepository.findAreaById(id);

      if (!area) {
        throw new NotFoundException('Area not found');
      }

      this.logger.log('Area found', FindAreaByIdUseCase.name);
      return area;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error find area',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
