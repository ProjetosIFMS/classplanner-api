import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllDisciplinesRepository } from '../repository/find-all-disciplines.repository';

@Injectable()
export class FindAllDisciplinesUseCase {
  constructor(
    private readonly findAllDisciplinesRepository: FindAllDisciplinesRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(includeModalities: boolean, includeInterests: boolean) {
    try {
      return await this.findAllDisciplinesRepository.findAllDisciplines(
        includeModalities,
        includeInterests,
      );
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding disciplines',
      });
      this.logger.error(err);
      throw err;
    }
  }
}
