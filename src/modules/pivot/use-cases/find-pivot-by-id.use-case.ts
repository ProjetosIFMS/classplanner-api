import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindPivotByIdRepository } from '../repository/find-pivot-by-id.repository';

@Injectable()
export class FindPivotByIdUseCase {
  constructor(
    private readonly findPivotByIdRepository: FindPivotByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const pivot = await this.findPivotByIdRepository.findPivotById(id);

      if (!pivot) {
        throw new NotFoundException('Pivot not found');
      }

      this.logger.log('Pivot found', FindPivotByIdUseCase.name);
      return pivot;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error find pivot',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
