import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DeletePivotRepository } from '../repository/delete-pivot.repository';
import { FindPivotByIdRepository } from '../repository/find-pivot-by-id.repository';

@Injectable()
export class DeletePivotUseCase {
  constructor(
    private readonly deletePivotRepository: DeletePivotRepository,
    private readonly findPivotByIdRepository: FindPivotByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const pivotExists = await this.findPivotByIdRepository.findPivotById(id);
      if (!pivotExists) {
        const error = new NotFoundException('Pivot not found');
        this.logger.error(error.message);
        throw error;
      }

      const pivot = await this.deletePivotRepository.deletePivot(id);
      this.logger.log('Pivot deleted', DeletePivotRepository.name);
      return pivot;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error deleting pivot',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
