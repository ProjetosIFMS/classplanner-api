import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllModalitiesRepository } from '../repository/find-all-modalities.repository';

@Injectable()
export class FindAllModalitiesUseCase {
  constructor(
    private readonly findAllModalitiesRepository: FindAllModalitiesRepository,
    private readonly logger: Logger = new Logger(),
  ) {}
  async execute() {
    try {
      const modalities =
        await this.findAllModalitiesRepository.findAllModalities();
      this.logger.log('All modalities fetched', FindAllModalitiesUseCase.name);
      return modalities;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error fetching modalities',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
