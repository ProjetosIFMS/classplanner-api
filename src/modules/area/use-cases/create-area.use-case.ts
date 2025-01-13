import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateAreaDto } from '../dto/create-area.dto';
import { CreateAreaRepository } from '../repository/create-area.repository';

@Injectable()
export class CreateAreaUseCase {
  constructor(
    private readonly createAreaRepository: CreateAreaRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateAreaDto) {
    try {
      const area = await this.createAreaRepository.createArea(data);
      this.logger.log('Area created', CreateAreaUseCase.name);
      return area;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating area',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
