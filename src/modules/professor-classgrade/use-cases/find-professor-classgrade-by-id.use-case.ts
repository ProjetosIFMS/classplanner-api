import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindProfessorClassgradeByIdRepository } from '../repository/find-professor-classgrade-by-id.repository';

@Injectable()
export class FindProfessorClassgradeByIdUseCase {
  constructor(
    private readonly findProfessorClassgradeByIdRepository: FindProfessorClassgradeByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(professorClassgrade_id: string) {
    try {
      const relationExists =
        this.findProfessorClassgradeByIdRepository.findById(
          professorClassgrade_id,
        );

      if (!relationExists) {
        throw new NotFoundException(
          'Relation between professor and classgrade not found',
        );
      }
      this.logger.log(
        'Relation between professor and classgrade found',
        FindProfessorClassgradeByIdUseCase.name,
      );

      return relationExists;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description:
          'Error finding the relation between professor and classgrade',
      });
      this.logger.error(err);
      throw err;
    }
  }
}
