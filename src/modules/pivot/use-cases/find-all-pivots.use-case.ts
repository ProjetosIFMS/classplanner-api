import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllPivotsRepository } from '../repository/find-all-pivot.repository';

@Injectable()
export class FindAllPivotsUseCase {
  constructor(
    private readonly findAllPivotsRepository: FindAllPivotsRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      const pivots = await this.findAllPivotsRepository.findAllPivots();
      if (!pivots) {
        throw new NotFoundException('No pivots found');
      }
      this.logger.log('Pivots found', FindAllPivotsUseCase.name);
      return pivots;
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
