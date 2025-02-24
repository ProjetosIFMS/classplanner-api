import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindProfessorClassgradeByClassgradeIdRepository } from '../repository/find-professor-classgrade-by-classgrade-id.repository';

@Injectable()
export class FindProfessorClassgradeByClassgradeIdUseCase {
  constructor(
    private readonly findProfessorClassgradeByClassgradeIdRepository: FindProfessorClassgradeByClassgradeIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(classgrade_id: string) {
    try {
      const classgradeExists =
        this.findProfessorClassgradeByClassgradeIdRepository.findByClassgradeId(
          classgrade_id,
        );

      if (!classgradeExists) {
        new NotFoundException('Classgrade related to professor not found');
      }

      this.logger.log(
        'Classgrade related to professor found',
        FindProfessorClassgradeByClassgradeIdUseCase.name,
      );
      return classgradeExists;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding classgrade related to professor',
      });
      this.logger.log(err);
      throw err;
    }
  }
}
