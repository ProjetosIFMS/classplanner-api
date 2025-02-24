import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllClassGradesRepository } from '../repository/find-all-classgrades.repository';

@Injectable()
export class FindAllClassGradeUseCase {
  constructor(
    private readonly findAllClassGradesRepository: FindAllClassGradesRepository,
    private readonly logger: Logger = new Logger(),
  ) {}
  async execute() {
    try {
      const classGrades =
        await this.findAllClassGradesRepository.findAllClassGrades();
      this.logger.log('All class grades fetched', FindAllClassGradeUseCase);
      return classGrades;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error fetching class grades',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
