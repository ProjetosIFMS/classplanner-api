import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllClassgradeDisciplinesRepository } from '../repository/find-all-classgrade-disciplines.repository';
import { FindAllDisciplinesUseCase } from 'src/modules/discipline/use-cases';

@Injectable()
export class FindAllClassgradeDisciplinesUseCase {
  constructor(
    private readonly findAllClassgradeDisciplinesRepository: FindAllClassgradeDisciplinesRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      const hasClassgradeDisciplines =
        await this.findAllClassgradeDisciplinesRepository.findAllClassgradeDisciplines();

      if (!hasClassgradeDisciplines) {
        const error = new NotFoundException(
          'No related disciplines to the classgrade',
        );
        this.logger.error(error);
        throw error;
      }

      this.logger.log('Disciplines found', FindAllDisciplinesUseCase.name);
      return hasClassgradeDisciplines;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding disciplines related to the classgrade',
      });
      this.logger.error(err);
      throw err;
    }
  }
}
