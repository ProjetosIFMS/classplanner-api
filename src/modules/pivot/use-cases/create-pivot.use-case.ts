import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreatePivotDto } from '../dto/create-pivot.dto';
import { CreatePivotRepository } from '../repository/create-pivot.repository';

@Injectable()
export class CreatePivotUseCase {
  constructor(
    private readonly createPivotRepository: CreatePivotRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreatePivotDto) {
    try {
      const pivot = await this.createPivotRepository.createPivot(data);
      this.logger.log('Pivot created', CreatePivotUseCase.name);
      return pivot;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating pivot',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
