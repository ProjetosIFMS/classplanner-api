import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllProfessorsClassgradesRepository } from '../repository/find-all-professors-classgrades.repository';

@Injectable()
export class FindAllProfessorClassgradesUseCase {
  constructor(
    private readonly findAllProfessorClassgradesRepository: FindAllProfessorsClassgradesRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      const professorsClassgrades =
        this.findAllProfessorClassgradesRepository.findAllProfessorsClassgrades();

      if (!professorsClassgrades) {
        throw new NotFoundException(
          'Relation of professors with classgrades not found',
        );
      }
      this.logger.log(
        'Relations of professors with classgrades found',
        FindAllProfessorClassgradesUseCase.name,
      );
      return professorsClassgrades;
    } catch (err) {
      new ServiceUnavailableException('Something bad happend', {
        cause: err,
        description: 'Error finding relation of professors with classgrades',
      });
      this.logger.error(err);
      throw err;
    }
  }
}
